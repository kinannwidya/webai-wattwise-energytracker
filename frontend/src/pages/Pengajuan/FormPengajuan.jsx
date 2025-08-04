// src/pages/Pengajuan/FormPengajuan.jsx
import { useState } from 'react';

const FormPengajuan = () => {
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'rumah',
    alamat: '',
    email: '',
    kontak: '',
    daya: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pengajuan berhasil dikirim!');
    // logika kirim data bisa ditambahkan di sini
  };

  return (
    <section id="ajukan-pengajuan" className="w-full py-5 text-white">
      <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Installation Request Form
      </h3>

      <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg border border-cyan-500/20">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Nama Pengguna */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-cyan-300 mb-2">Full Name</label>
            <input
              id="nama"
              name="nama"
              type="text"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Tipe Bangunan */}
          <div>
            <label htmlFor="tipe" className="block text-sm font-medium text-cyan-300 mb-2">Building Type</label>
            <select
              id="tipe"
              name="tipe"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            >
              <option value="rumah">Residential</option>
              <option value="bisnis">Business</option>
            </select>
          </div>

          {/* Alamat Lokasi Pemasangan */}
          <div className="md:col-span-2">
            <label htmlFor="alamat" className="block text-sm font-medium text-cyan-300 mb-2">Installation Address</label>
            <input
              id="alamat"
              name="alamat"
              type="text"
              placeholder="Enter complete installation address"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Email Aktif */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyan-300 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Nomor Kontak */}
          <div>
            <label htmlFor="kontak" className="block text-sm font-medium text-cyan-300 mb-2">Phone Number</label>
            <input
              id="kontak"
              name="kontak"
              type="tel"
              placeholder="e.g. 08123456789"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Kebutuhan Daya (VA/Watt) */}
          <div className="md:col-span-2">
            <label htmlFor="daya" className="block text-sm font-medium text-cyan-300 mb-2">Power Requirement (VA/Watt)</label>
            <input
              id="daya"
              name="daya"
              type="text"
              placeholder="e.g. 1300 VA or 900 Watt"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1e293b] border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Tombol Ajukan Pengajuan */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300 font-semibold shadow-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormPengajuan;