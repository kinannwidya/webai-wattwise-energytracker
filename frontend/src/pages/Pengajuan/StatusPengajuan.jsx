// src/pages/Pengajuan/StatusPengajuan.jsx
const dummyData = [
  {
    id: 'REQ001',
    date: '2025-07-27',
    name: 'Dewi Kusuma',
    address: 'Jl. Melati No. 12, Jakarta',
    type: 'Residential',
    status: 'In Progress'
  },
  {
    id: 'REQ002',
    date: '2025-07-26',
    name: 'Andi Santoso',
    address: 'Jl. Mangga 8, Bandung',
    type: 'Business',
    status: 'Approved'
  },
  {
    id: 'REQ003',
    date: '2025-07-25',
    name: 'Budi Raharjo',
    address: 'Jl. Anggrek 22, Surabaya',
    type: 'Residential',
    status: 'Rejected'
  }
];

const StatusPengajuan = () => {
  return (
    <div id="status-pengajuan" className="w-full">
      <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Installation Request Status
      </h3>

      <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-cyan-500/20">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full border border-[#1e293b]">
            <thead className="bg-[#1e293b]">
              <tr>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Request ID</th>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Request Date</th>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Customer Name</th>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Installation Address</th>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Building Type</th>
                <th className="p-4 border border-[#1e293b] text-left text-sm font-semibold text-cyan-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#1e293b]/50 transition-colors duration-200"
                >
                  <td className="p-4 border border-[#1e293b] text-sm text-gray-300 font-mono">{item.id}</td>
                  <td className="p-4 border border-[#1e293b] text-sm text-gray-300">{item.date}</td>
                  <td className="p-4 border border-[#1e293b] text-sm text-gray-300">{item.name}</td>
                  <td className="p-4 border border-[#1e293b] text-sm text-gray-300">{item.address}</td>
                  <td className="p-4 border border-[#1e293b] text-sm text-gray-300">{item.type}</td>
                  <td className="p-4 border border-[#1e293b] text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Approved' ? 'bg-green-900/30 text-green-400 border border-green-500/30' :
                        item.status === 'In Progress' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-900/30 text-red-400 border border-red-500/30'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
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
    </div>
  );
};

export default StatusPengajuan;