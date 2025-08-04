// src/pages/Dashboard/BillingPredict.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BillingPredict({ Predictions, isLoading }) {
  const [hargaPerKwh, setHargaPerKwh] = useState(1440.7);
  // State untuk melacak apakah perangkat saat ini adalah mobile
  const [isMobile, setIsMobile] = useState(false);

  // Fungsi untuk format angka rupiah berdasarkan lebar layar
  const formatRupiah = (number) => {
    // Gunakan Intl.NumberFormat untuk format yang lebih baik
    const options = {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: isMobile ? 0 : 2,
      maximumFractionDigits: isMobile ? 0 : 2,
    };
    // Gunakan 'id-ID' locale untuk pemisah ribuan titik dan desimal koma
    const formatted = new Intl.NumberFormat('id-ID', options).format(number);

    // Hapus simbol 'Rp' jika ada dan kembalikan hanya angkanya
    return formatted.replace('Rp', '').trim();
  };

  // Gunakan useEffect untuk mendeteksi perubahan lebar layar
  useEffect(() => {
    const handleResize = () => {
      // Set state isMobile jika lebar layar kurang dari atau sama dengan 768px (breakpoint md Tailwind)
      setIsMobile(window.innerWidth <= 768);
    };

    // Panggil fungsi handleResize saat komponen dimuat
    handleResize();

    // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
    window.addEventListener('resize', handleResize);

    // Bersihkan event listener saat komponen dilepas
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading state
  if (isLoading || !Predictions || !Predictions.predictions) {
    return (
      <section id="billing" className="py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            MONTHLY ENERGY BILL
          </h3>
          <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-cyan-500/20 animate-pulse">
            <div className="h-6 bg-[#1e293b] rounded-full mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-[#1e293b] p-4 rounded-xl h-48 border border-cyan-500/10"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { predictions, mae_daily } = Predictions;
  const mae = typeof mae_daily === 'number' ? mae_daily : 0;

  const total7DayKwh = predictions.reduce((sum, p) => sum + p.consumption, 0);
  const avgDailyKwh = total7DayKwh / predictions.length;

  const estKwhMonth = avgDailyKwh * 30;
  const estBilling = estKwhMonth * hargaPerKwh;

  const minKwh = Math.max(0, (avgDailyKwh - mae) * 30);
  const maxKwh = (avgDailyKwh + mae) * 30;
  const minBilling = minKwh * hargaPerKwh;
  const maxBilling = maxKwh * hargaPerKwh;

  const handleHargaChange = (e) => {
    const value = e.target.value;
    setHargaPerKwh(value === '' ? '' : Math.max(0, parseFloat(value)));
  };

  return (
    <motion.section
      id="billing"
      className="py-12 px-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold pb-2 mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Monthly Electricity Bill Estimation
        </h3>

        <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg border border-cyan-500/20">

          {/* Main Stats Flexbox - Adjusting height */}
          <div className="flex flex-col md:flex-row gap-5 items-stretch">

            {/* Left Column - Projected Bill and Price Input */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Price Input */}
              <div>
                <label htmlFor="hargaKwh" className="block text-sm font-medium mb-2 text-cyan-300">
                  ELECTRICITY PRICE (kWh)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 font-mono">Rp</span>
                  <input
                    id="hargaKwh"
                    type="number"
                    value={hargaPerKwh}
                    onChange={handleHargaChange}
                    step="0.1"
                    className="w-full pl-10 p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white text-lg font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Projected Bill Card */}
              <motion.div
                className="bg-[#1e293b] p-5 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 flex-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-sm text-cyan-400 mb-2 font-medium">Projected Bill</p>
                <h4 className="text-3xl font-bold text-white mb-1 font-mono">
                  {formatRupiah(estBilling)}
                </h4>
                <p className="text-sm text-gray-400 mt-3 font-mono">
                  ~ {estKwhMonth.toFixed(1)} kWh
                </p>
              </motion.div>
            </div>

            {/* Right Column - Combined Range Card */}
            <motion.div
              className="bg-[#1e293b] p-5 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-sm text-blue-400 mb-4 font-medium">Consumption & Bill Range</p>

              <div className="space-y-4">
                {/* Min Range */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">MINIMUM</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0f172a] p-2 rounded">
                    <span className="text-sm font-mono text-white">{minKwh.toFixed(1)} kWh</span>
                    <span className="text-sm font-mono text-white">{formatRupiah(minBilling)}</span>
                  </div>
                </div>

                {/* Range Bar */}
                <div className="h-1.5 w-full bg-blue-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>

                {/* Max Range */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">MAXIMUM</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0f172a] p-2 rounded">
                    <span className="text-sm font-mono text-white">{maxKwh.toFixed(1)} kWh</span>
                    <span className="text-sm font-mono text-white">{formatRupiah(maxBilling)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Accuracy Indicator */}
          <div className="mt-6 pt-4 border-t border-cyan-900/50 text-center">
            <span className="text-xs text-gray-400">Forecast Error (MAE): </span>
            <span className="text-xs font-mono text-cyan-400">{mae.toFixed(2)} kWh</span>
            <span className="text-xs text-gray-400"> • Estimated Bill Based on 7-Day Average • Actual May Vary </span>
          </div>
        </div>

      </div>
    </motion.section>
  );
}