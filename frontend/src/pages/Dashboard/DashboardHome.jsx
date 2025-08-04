// src/pages/Dashboard/DashboardHome.jsx
import { useState, useEffect } from "react";
import { fetchHistoricalData, fetchPredictions, resetSimulation } from "../../utils/api";
import HistoricalStats from "./HistoricalStats";
import RealtimePredict from "./RealtimePredict";
import BillingPredict from "./BillingPredict";

const DashboardHome = () => {
  const [historicalData, setHistoricalData] = useState(null);
  const [Predictions, setPredictions] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil semua data
    const fetchAllData = () => {
      fetchHistoricalData()
        .then(setHistoricalData)
        .catch((error) => console.error("Gagal memuat historical data:", error));

      fetchPredictions()
        .then(setPredictions)
        .catch((error) => console.error("Gagal memuat predictions:", error));
    };

    let intervalId;

    // Fungsi async untuk mengatur flow: reset -> fetch -> interval
    const initializeSimulation = async () => {
      try {
        // 1. Reset simulasi terlebih dahulu
        await resetSimulation();

        // 2. Setelah reset berhasil, jalankan fetch pertama kali
        fetchAllData();

        // 3. Setup interval untuk fetch data secara berkala
        intervalId = setInterval(fetchAllData, 3000);
      } catch (error) {
        // Tangani jika reset gagal
        console.error("Initialization failed:", error);
      }
    };

    initializeSimulation();

    // Mengembalikan cleanup function yang akan dipanggil saat komponen di-unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div id="history Statistics">
        <HistoricalStats historicalData={historicalData} />
      </div>
      <div id="realtime Prediction">
        <RealtimePredict Predictions={Predictions} />
      </div>
      <div id="billing Estimation">
        <BillingPredict Predictions={Predictions} />
      </div>
    </div>
  );
};

export default DashboardHome;