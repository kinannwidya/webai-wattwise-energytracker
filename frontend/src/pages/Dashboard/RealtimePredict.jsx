// src/pages/Dashboard/RealtimePredict.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RealtimePredict = ({ Predictions, isLoading }) => {
  if (isLoading) {
    return (
      <section id="predict" className="py-12">
        <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          🔮 Loading Predictions...
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-[#0f172a] p-6 rounded-xl shadow-lg border border-cyan-500/20">
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse rounded-xl w-full h-full bg-[#1e293b]"></div>
            </div>
          </div>
          <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-blue-500/20">
            <div className="animate-pulse rounded-xl w-full h-64 bg-[#1e293b]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!Predictions) {
    return <p className="text-white">No prediction data available.</p>;
  }

  const predictionData = Predictions.predictions || [];
  const { max_pred_day, max_pred_value, mae_daily } = Predictions.summary || {};

  const predictionChartData = {
    labels: predictionData.map((d) => moment(d.date).format("DD MMM")),
    datasets: [
      {
        label: "Predicted Consumption (kWh)",
        data: predictionData.map((d) => d.consumption),
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.1)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#22d3ee',
        pointHoverRadius: 6,
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const predictionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20,
          boxWidth: 0,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1e40af',
        borderWidth: 1,
        cornerRadius: 8,
        titleColor: '#22d3ee',
        bodyColor: '#e2e8f0',
        padding: 12,
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        titleFont: {
          size: 16,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        displayColors: false,
        callbacks: {
          label: function (context) {
            return ` ${context.parsed.y.toFixed(2)} kWh`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: '#1e293b',
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          callback: function (value) {
            return value.toFixed(2) + ' kWh';
          }
        },
        grid: {
          color: '#1e293b',
          drawBorder: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <section id="predict" className="text-white">
      <h3 className="text-3xl font-bold pb-2 mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Electricity Usage Outlook (7-Day Forecast)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="col-span-2 bg-[#0f172a] p-6 rounded-xl shadow-lg border border-cyan-500/20">
          <h4 className="text-xl font-semibold mb-4 text-center text-cyan-400">
            Consumption Prediction Visualization
          </h4>
          <div className="h-86">
            <Line
              data={predictionChartData}
              options={predictionChartOptions}
              redraw={false}
            />
          </div>
        </div>

        {/* Summary and Table Card */}
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-blue-500/20">
          <h5 className="text-xl font-semibold text-center mb-4 text-blue-400">
            Daily Prediction Details
          </h5>

          {/* Summary Section */}
          <div className="mb-6 space-y-4">
            <div className="bg-[#1e293b] rounded-xl p-4 border border-blue-500/20 text-center">
              <p className="text-sm text-blue-200 mb-1">Highest Predicted Consumption</p>
              <p className="text-2xl font-bold text-white">{parseFloat(max_pred_value).toFixed(2)} kWh</p>
              <p className="text-sm text-blue-200 mt-1">
                on <span className="font-medium text-white">{max_pred_day}</span>
              </p>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-y-auto h-56 pr-2 custom-scrollbar">
            <table className="w-full text-sm table-fixed">
              <thead className="sticky top-0">
                <tr className="bg-[#1e293b]">
                  <th className="py-3 px-4 text-left text-cyan-200 rounded-tl-lg w-[35%]">Date</th>
                  <th className="py-3 px-4 text-right text-blue-200 rounded-tr-lg w-[65%]">Predicted (kWh)</th>
                </tr>
              </thead>
              <tbody>
                {predictionData.map((p, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-700 hover:bg-[#1e293b]/50"
                  >
                    <td className="py-3 px-4 text-gray-300 w-[35%]">
                      {moment(p.date).format("DD MMM")}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-cyan-400 w-[65%]">
                      {p.consumption?.toFixed(2) || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}</style>
    </section>
  );
};

export default RealtimePredict;