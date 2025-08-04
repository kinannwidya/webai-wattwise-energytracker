// src/pages/Dashboard/HistoricalStats.jsx

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const HistoricalStats = ({ historicalData }) => {
  if (!historicalData) {
    return <p className="text-white">Loading historical data...</p>;
  }

  const formatKWH = (value) => parseFloat(value).toFixed(2);
  const { daily_data, hourly_data, summary, current_time } = historicalData;

  // Fungsi untuk mengonversi string waktu 24 jam menjadi format AM/PM
  const formatPeakTime = (timeString) => {
    // Memastikan string waktu valid sebelum diproses
    if (!timeString || timeString.split(' ').length < 3) {
      return timeString; // Kembali ke format asli jika tidak valid
    }

    // Input string: "14:00 at 30 Jul" -> "HH:mm at DD Mon"
    const [time, , date, month] = timeString.split(' ');

    // Mendapatkan tahun dari waktu simulasi saat ini
    const currentTime = new Date(current_time);
    const year = currentTime.getFullYear();

    // Membuat objek Date yang valid
    const dateObject = new Date(`${month} ${date}, ${year} ${time}`);

    // Menggunakan toLocaleString untuk format AM/PM yang diinginkan
    return dateObject.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
    });
  };

  // Daily Chart
  const dailyChartData = {
    labels: daily_data.map((d) => d.date),
    datasets: [
      {
        label: "Daily Consumption (kWh)",
        data: daily_data.map((d) => d.consumption),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#22d3ee',
        borderWidth: 2,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e2e8f0', font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1e40af',
        borderWidth: 1,
        cornerRadius: 8,
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        padding: 12,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatKWH(context.parsed.y)} kWh`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { color: '#1e293b', drawBorder: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#94a3b8', font: { size: 12 }, callback: (value) => formatKWH(value) },
        grid: { color: '#1e293b', drawBorder: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  // Hourly Chart
  const hourlyChartData = {
    labels: hourly_data.map((d) => d.datetime),
    datasets: [
      {
        label: "Hourly Consumption (kWh)",
        data: hourly_data.map((d) => d.consumption),
        fill: false,
        borderColor: "#10b981",
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#60a5fa',
        borderWidth: 2,
      },
    ],
  };

  // Opsi grafik jam-jaman dengan tema dark dan format AM/PM
  const hourlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e2e8f0', font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1e40af',
        borderWidth: 1,
        cornerRadius: 8,
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        padding: 12,
        callbacks: {
          title: (tooltipItem) => {
            const date = new Date(tooltipItem[0].label);
            // Menggunakan opsi hour12: true untuk format AM/PM
            return date.toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
          },
          label: (context) => `${context.dataset.label}: ${formatKWH(context.parsed.y)} kWh`,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          // Menggunakan format 12 jam (AM/PM) di tooltip
          tooltipFormat: 'DD MMM hh:mm a',
          // Menggunakan format 12 jam (AM/PM) di label sumbu X
          displayFormats: { hour: 'h:mm a' }
        },
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { color: '#1e293b', drawBorder: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#94a3b8', font: { size: 12 }, callback: (value) => formatKWH(value) },
        grid: { color: '#1e293b', drawBorder: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'linear',
    },
  };

  const simulationDateDisplay = new Date(current_time).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris'
  });

  return (
    <section id="summary" className="py-5 text-white">
      <h3 className="text-3xl font-bold pb-2 mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Realtime Usage Monitoring
      </h3>

      <p className="mb-8 text-center text-cyan-200">
        Real-time data until: <span className="font-semibold text-cyan-400">{simulationDateDisplay}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Daily Chart Card */}
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-cyan-500/20">
          <h4 className="text-xl font-semibold mb-4 text-cyan-400 text-center">Daily Electricity Consumption</h4>
          <div className="h-64 mb-6">
            <Line data={dailyChartData} options={dailyChartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e293b] rounded-xl p-4 border border-cyan-500/20">
              <p className="text-sm text-cyan-200 mb-1">Average Daily Consumption</p>
              <p className="text-2xl font-bold text-white">{formatKWH(summary.avg_daily_hist)} kWh</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4 border border-blue-500/20">
              <p className="text-sm text-blue-200 mb-1">Total (Last 7 Days)</p>
              <p className="text-2xl font-bold text-white">{formatKWH(summary.total_7day_hist)} kWh</p>
            </div>
          </div>
        </div>

        {/* Hourly Chart Card */}
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-blue-500/20">
          <h4 className="text-xl font-semibold mb-4 text-blue-400 text-center">Hourly Consumption Pattern</h4>
          <div className="h-64 mb-6">
            <Line data={hourlyChartData} options={hourlyChartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e293b] rounded-xl p-4 border border-cyan-500/20">
              <p className="text-sm text-cyan-200 mb-1">Average Hourly Consumption</p>
              <p className="text-2xl font-bold text-white">{formatKWH(summary.avg_hourly_hist)} kWh</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4 border border-blue-500/20">
              <p className="text-sm text-blue-200 mb-1">Peak Consumption</p>
              <p className="text-2xl font-bold text-white">{formatKWH(summary.max_hourly_hist)} kWh</p>
              <p className="text-sm text-blue-200 mt-1">
                at <span className="font-medium">{formatPeakTime(summary.time_max_kwh)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricalStats;