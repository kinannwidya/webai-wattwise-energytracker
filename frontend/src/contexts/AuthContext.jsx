// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Buat Context untuk Otentikasi
const AuthContext = createContext(null);

// Hook kustom untuk menggunakan AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component yang akan membungkus aplikasi dan menyediakan nilai otentikasi
export const AuthProvider = ({ children }) => {
  // Gunakan state untuk menyimpan informasi pengguna yang signin
  // Untuk contoh ini, kita akan menggunakan placeholder isLoggedin
  // Di aplikasi nyata, ini akan diambil dari Firebase, API, atau Local Storage
  const [user, setUser] = useState(null); // Bisa berupa objek user atau null
  const [loading, setLoading] = useState(true); // Untuk menandakan apakah proses otentikasi sedang berlangsung

  useEffect(() => {
    // Di sini kamu akan menempatkan logika inisialisasi otentikasi
    // Contoh: mengecek token di localStorage, atau menginisialisasi Firebase auth listener
    // Untuk tujuan demonstrasi, kita akan simulasi signin cepat
    const storedUser = localStorage.getItem('currentUser'); // Contoh: mengambil dari localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fungsi untuk simulasi signin
  const signin = async (userData) => {
    // Di sini kamu akan menempatkan logika signin yang sebenarnya (misal: panggil API signin)
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData)); // Simpan di localStorage
        resolve();
      }, 500); // Simulasi penundaan
    });
  };

  // Fungsi untuk logout
  const logout = async () => {
    // Di sini kamu akan menempatkan logika logout yang sebenarnya (misal: hapus token, panggil API logout)
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('currentUser'); // Hapus dari localStorage
        resolve();
      }, 300); // Simulasi penundaan
    });
  };

  // Nilai yang akan disediakan oleh AuthContext
  const value = {
    user,
    isLoggedIn: !!user, // Mengkonversi user objek menjadi boolean
    signin,
    logout,
    loading,
  };

  if (loading) {
    // Kamu bisa menampilkan loading spinner di sini
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
