# C:\Projects\my-shehacks\backend\main.py
import pytz
import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
import threading
import time
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta

# Konfigurasi direktori dan file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'household_power_consumption.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'model_listrik_lstm.keras')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler_listrik.pkl')

# Inisialisasi app
app = FastAPI()

# Sebut middleware: Semua request dari client (browser, aplikasi, dsb) lewat dulu ke middleware sebelum sampai ke "pintu" endpoint-mu (@app.get(...) misalnya).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Konstanta & Global Variables
# Kenapa disebut global variable? Karena didefinisikan di luar fungsi/class
# Bagian ini mendefinisikan konstanta penting dan timezone handling.

df_full_preprocessed = None
model_lstm = None
scaler = None
LOOK_BACK = 168  # durasi historis => 168 jam (1 minggu)
FORECAST_HORIZON = 168  # masa prediksi => 168 jam (1 minggu)

PARIS_TZ = pytz.timezone('Europe/Paris')
SIMULATION_START_DATE = PARIS_TZ.localize(datetime(2007, 4, 1, 0, 0, 0))
SIMULATION_END_DATE_DISPLAY = PARIS_TZ.localize(datetime(2007, 4, 8, 0, 0, 0)) # Batas tampilan grafik/simulasi: 7 Juni 2007 23:59:00 Paris time
SIMULATION_END_DATE_DATA = PARIS_TZ.localize(datetime(2007, 6, 30, 00, 00, 0))
# Waktu simulasi global
current_simulation_datetime = SIMULATION_END_DATE_DISPLAY

# UTC (Coordinated Universal Time) adalah standar waktu global (patokan global)
# Negara lain hanya menambahkan atau mengurangi waktu dari UTC (misalnya Indonesia = UTC+7)

# Tambahkan endpoint baru untuk mereset simulasi
@app.post("/api/reset-simulation")
async def reset_simulation():
    """
    Endpoint untuk mereset waktu simulasi kembali ke awal.
    """
    global current_simulation_datetime
    current_simulation_datetime = SIMULATION_END_DATE_DISPLAY
    print(f"[Simulasi] Waktu simulasi telah direset ke: {current_simulation_datetime}")
    return {"message": "Simulasi berhasil direset."}

# Data Preprocessing
# Fungsi untuk memperbaiki format tahun
# Memperbaiki tahun dalam data tanggal agar dari format dd/mm/yy menjadi dd/mm/yyyy 
# (misalnya 16/12/06 → 16/12/2006).
def fix_year(date_str):
    parts = date_str.strip().split('/')
    if len(parts[2]) == 2:
        parts[2] = '20' + parts[2]
    return '/'.join(parts)

# Fungsi asynchronous untuk:Load CSV, perbaiki format, interpolasi missing data, hitung kWh, dan lokalisasi timezone
async def load_and_preprocess_data():
    global df_full_preprocessed, model_lstm, scaler
    # Membaca data dari file CSV berisi konsumsi daya rumah tangga.
    df = pd.read_csv(DATA_PATH)
    # Mengubah seluruh kolom Date ke string, lalu memperbaiki format tahunnya dengan fix_year().
    df['Date'] = df['Date'].astype(str).apply(fix_year)
    # Menggabungkan kolom Date dan Time jadi satu kolom datetime, lalu mengubah ke format timestamp.
    df['datetime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'], format='%d/%m/%Y %H:%M:%S', errors='coerce')
    # Buang baris yang gagal konversi waktu
    # Menghapus baris yang datetime-nya kosong karena gagal parsing.
    # Gagal parsing artinya program tidak berhasil membaca, mengurai, atau memahami format data yang dikasih.
    # Parsing = proses mengubah data mentah (misalnya string teks) menjadi format yang bisa diproses (misalnya objek datetime, angka, JSON, dll).
    df = df.dropna(subset=['datetime'])
    # Set kolom datetime jadi index utama dari DataFrame.
    # Banyak fungsi analisis waktu di Pandas (seperti resample()) hanya bisa dipakai kalau index-nya adalah waktu (datetime).
    df = df.set_index('datetime')

    # Mengonversi semua kolom kecuali Date dan Time menjadi numerik, errors='coerce' akan ganti error jadi NaN.
    numeric_cols = [col for col in df.columns if col not in ['Date', 'Time']]
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # Isi missing value
    # Interpolasi nilai yang hilang berdasarkan waktu, lalu isi NaN dengan rata-rata kolom.
    numeric_cols_to_process = df.select_dtypes(include=[np.number]).columns.tolist()
    df[numeric_cols_to_process] = df[numeric_cols_to_process].interpolate(method='time')
    df[numeric_cols_to_process] = df[numeric_cols_to_process].fillna(df[numeric_cols_to_process].mean())

    # Hitung konsumsi listrik per jam (kWh)
    # Karena Global_active_power satuannya Watt-minute, maka dikali 1/60 untuk dapat kWh.
    hourly_kwh = df['Global_active_power'].resample('h').sum() * (1/60)
    # Tambahkan kolom perubahan konsumsi antar jam (delta_power).
    # Isi nilai pertama dengan 0 (karena belum ada pembanding sebelumnya).
    df_hourly = pd.DataFrame({'Global_active_power': hourly_kwh})
    df_hourly['delta_power'] = df_hourly['Global_active_power'].diff().fillna(0)

    # Lokalisasi timezone asli dari data (Europe/Paris)
    # Memberi tahu Python bahwa timestamp tersebut menggunakan zona waktu Paris.
    # Solusi terbaik:
    df_hourly.index = df_hourly.index.tz_localize('UTC').tz_convert('Europe/Paris')


    # Mengambil subset data dari tanggal 1 April hingga 30 Juni 2007 sebagai data yang akan digunakan untuk simulasi/prediksi.
    df_full_preprocessed = df_hourly.loc['2007-04-01':'2007-06-29'].copy()
    # Cetak notifikasi keberhasilan
    print("Data preprocessed successfully!")

# Fungsi ini dijalankan dalam thread terpisah.
# Berjalan terus selama server hidup.
def update_simulation_time_loop():
    global current_simulation_datetime
    # Loop untuk memperbarui waktu simulasi
    # Setiap 3 detik waktu nyata, waktu simulasi akan maju 1 jam.
    while current_simulation_datetime < SIMULATION_END_DATE_DATA:
        time.sleep(3)  # tiap 3 detik di dunia nyata
        current_simulation_datetime += timedelta(hours=1)
        # Print waktu simulasi saat ini
        print(f"[Simulasi] Waktu saat ini: {current_simulation_datetime}")

# Startup Event Handler
# Ini adalah FastAPI event hook yang akan otomatis dijalankan sekali saat aplikasi server pertama kali nyala.
# Fungsinya di sini: Panggil load_and_preprocess_data() → siapkan data ke memori. Load model LSTM dari disk (MODEL_PATH). Dan Load scaler (joblib.load) dari disk (SCALER_PATH).
@app.on_event("startup")
async def load_resources():
    global model_lstm, scaler
    try:
        await load_and_preprocess_data()
        # Meload model LSTM yang sudah dilatih sebelumnya dari file .keras.
        model_lstm = tf.keras.models.load_model(MODEL_PATH)
        # Meload objek scaler (biasanya MinMaxScaler) dari file .pkl
        # Scaler ini dipakai untuk menormalisasi input sebelum diprediksi oleh model LSTM.
        scaler = joblib.load(SCALER_PATH)
        print("Model and Scaler loaded successfully!")

        # Mulai thread simulasi waktu
        # Memulai background thread yang menjalankan fungsi update_simulation_time_loop.
        # Tujuannya untuk mensimulasikan waktu berjalan secara otomatis setiap beberapa detik.
        threading.Thread(target=update_simulation_time_loop, daemon=True).start()
        print("Simulasi waktu dimulai.")

    except Exception as e:
        print(f"Error loading resources: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load server resources: {e}")

@app.get("/api/historical-data")
async def get_historical_data():
    # Jika df_full_preprocessed belum di-load atau belum diproses, server akan error.
    if df_full_preprocessed is None:
        raise HTTPException(status_code=500, detail="Historical data not loaded or preprocessed.")

    # Gunakan variabel global langsung
    current_sim_dt_paris = current_simulation_datetime

    # Ambil Slice Data
    # Ambil bagian data dari SIMULATION_START_DATE sampai waktu simulasi yang diminta.
    current_data_slice = df_full_preprocessed.loc[SIMULATION_START_DATE : current_sim_dt_paris].copy()
    
    # Hitung Daily dan Hourly Consumption
    daily_consumption = current_data_slice['Global_active_power'].resample('D').sum().tail(7)
    hourly_consumption = current_data_slice['Global_active_power'].last('24H')

    # Format Daily Data (untuk grafik harian). Bentuk list of dicts seperti: {"date": "2025-07-24", "consumption": 3.5}
    daily_data = [{"date": date.strftime("%Y-%m-%d"), "consumption": value}
                  for date, value in daily_consumption.items()]
    # Format Hourly Data (untuk grafik jam-jaman). 
    hourly_data = [{"datetime": dt.strftime("%Y-%m-%dT%H:%M:%S"), "consumption": value}
               for dt, value in hourly_consumption.items()]

    # Hitung Ringkasan Statistik
    total_7day_hist = daily_consumption.sum()
    avg_daily_hist = daily_consumption.mean()
    avg_hourly_hist = hourly_consumption.mean()
    max_hourly_hist = hourly_consumption.max()
    time_max_hourly_hist = hourly_consumption.idxmax().strftime("%H:%M at %d %b")

    return {
        "daily_data": daily_data,
        "hourly_data": hourly_data,
        "summary": {
            "avg_daily_hist": float(avg_daily_hist) if not pd.isna(avg_daily_hist) else 0.0,
            "total_7day_hist": float(total_7day_hist) if not pd.isna(total_7day_hist) else 0.0,
            "avg_hourly_hist": float(avg_hourly_hist) if not pd.isna(avg_hourly_hist) else 0.0,
            "max_hourly_hist": float(max_hourly_hist) if not pd.isna(max_hourly_hist) else 0.0,
            "time_max_kwh": time_max_hourly_hist
        },
        "current_time": current_sim_dt_paris.isoformat() # Ini untuk debugging di frontend
    }

    # Bentuk JSON yang akan dikirim ke frontend seperti:
    # {
    #     "daily_data": [...],
    #     "hourly_data": [...],
    #     "summary": {
    #         "avg_daily_hist": 2.1,
    #         "total_7day_hist": 14.7,
    #         "avg_hourly_hist": 0.24,
    #         "max_hourly_hist": 0.53,
    #         "time_max_kwh": "14:00 pada 30 Jul"
    #     }
    # }

# Endpoint untuk prediksi
# Endpoint = Alamat URL spesifik di server yang bisa kamu akses lewat internet atau aplikasi.
# @app.post("/api/predictions") artinya "Buat endpoint HTTP POST di path /api/predictions."
# Maksudnya: Ketika ada permintaan (request) dari frontend / browser / API client yang: 
# pakai metode POST ke URL seperti http://localhost:8000/api/predictions 
# atau mengirimkan JSON data (misalnya input prediksi)
# Maka, FastAPI akan menjalankan fungsi berikutnya: async def get_predictions
@app.get("/api/predictions")
async def get_predictions():
    global current_simulation_datetime
    print(f"Received prediction request for datetime: {current_simulation_datetime}")
    # Validasi Model & Data: Memastikan model, scaler, dan data preprocessing sudah di-load. Jika tidak, server akan balas error 500.
    if model_lstm is None or scaler is None or df_full_preprocessed is None:
        raise HTTPException(status_code=500, detail="Model, scaler, or preprocessed data not loaded.")
    
    # Gunakan variabel global langsung
    current_sim_dt_paris = current_simulation_datetime

    # Ambil Data Historis untuk Prediksi: Mengambil LOOK_BACK jam data terakhir sebelum waktu simulasi untuk digunakan sebagai input model.
    # df_full_preprocessed.loc[:current_sim_dt_paris] : Ini memilih semua baris dalam data historis (yang sudah di-preprocess) 
    # sampai waktu tertentu, misalnya: "Berikan semua data dari awal sampai 2007-06-30."
    # Lalu dari hasil tersebut, ambil LOOK_BACK baris terakhir.
    input_data_for_prediction = df_full_preprocessed.loc[:current_sim_dt_paris].tail(LOOK_BACK).copy()

    # Pastikan data historis cukup. Jika kurang dari LOOK_BACK jam, prediksi tidak bisa dilakukan.
    if len(input_data_for_prediction) < LOOK_BACK:
        raise HTTPException(
            status_code=400,
            detail=f"Not enough historical data for prediction. Need at least {LOOK_BACK} hours leading up to {current_sim_dt_paris}. Currently available: {len(input_data_for_prediction)} hours."
        )

    # Mengambil dua fitur penting: Global_active_power dan delta_power
    last_known_data = input_data_for_prediction[['Global_active_power', 'delta_power']].values
    # Melakukan normalisasi (scaling) agar sesuai dengan model
    scaled_input = scaler.transform(last_known_data)
    num_features = scaled_input.shape[1]
    current_input_sequence = scaled_input.reshape(1, LOOK_BACK, num_features)

    #Gini bener ga?
    print(scaled_input.shape)
    print(current_input_sequence.shape)

    # Menghasilkan output prediksi dari model, dalam bentuk yang masih ter-skala.
    raw_predictions_scaled = model_lstm.predict(current_input_sequence)
    
    # Unscale Hasil Prediksi
    # Karena scaler butuh 2 fitur untuk inverse transform, 
    # kita tambahkan dummy (nol) untuk delta_power agar bisa 
    # mengembalikan nilai Global_active_power ke skala aslinya.
    dummy_delta = np.zeros((raw_predictions_scaled.shape[1], num_features - 1))
    combined_predictions_for_unscale = np.concatenate((raw_predictions_scaled.T, dummy_delta), axis=1)
    unscaled_full_predictions = scaler.inverse_transform(combined_predictions_for_unscale)
    
    # Ambil hasil prediksi konsumsi listrik per jam. Di-limit minimal ke 0 (tidak boleh negatif).
    hourly_predictions_kwh = unscaled_full_predictions[:, 0]
    hourly_predictions_kwh = np.maximum(0, hourly_predictions_kwh)

    # Menjumlahkan 24 jam = 1 hari → buat prediksi konsumsi listrik selama 7 hari ke depan.
    daily_predictions_kwh = []
    for i in range(7):
        start_hour = i * 24
        end_hour = (i + 1) * 24
        if end_hour <= len(hourly_predictions_kwh):
            daily_sum = hourly_predictions_kwh[start_hour:end_hour].sum()
            daily_predictions_kwh.append(float(daily_sum))
        else:
            break

    last_actual_date = current_sim_dt_paris.date()

    # Buat Daftar Tanggal Prediksi untuk 7 hari ke depan, sebagai label prediksi.
    future_dates = [(last_actual_date + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(1, len(daily_predictions_kwh) + 1)]
    # Bentuk Data JSON Output: Gabungkan tanggal dan hasil prediksi dalam bentuk dictionary {date, consumption}.
    predicted_data = [{"date": date, "consumption": value}
                      for date, value in zip(future_dates, daily_predictions_kwh)]

    MAE_KWH_DAILY = 2.4

    # Cari hari dengan konsumsi tertinggi dari hasil prediksi.
    max_pred_day_obj = max(predicted_data, key=lambda x: x['consumption']) if predicted_data else None
    max_pred_day = datetime.strptime(max_pred_day_obj['date'], "%Y-%m-%d").strftime("%d %b %Y") if max_pred_day_obj else "-- -- ----"
    max_pred_value = float(max_pred_day_obj['consumption']) if max_pred_day_obj else 0.0

    return {
        "predictions": predicted_data,
        "mae_daily": MAE_KWH_DAILY,
        "summary": {
            "max_pred_day": max_pred_day,
            "max_pred_value": max_pred_value
        }
    }

