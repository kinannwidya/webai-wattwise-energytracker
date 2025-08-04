// src/router/index.jsx
import { Routes, Route } from 'react-router-dom';

// Layouts
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
// Landing Pages
import LandingPage from '../pages/Landing/LandingPage';
// Dashboard Pages
import DashboardHome from '../pages/Dashboard/DashboardHome';
// Pengajuan
import PengajuanPage from '../pages/Pengajuan/PengajuanPage';
// Bantuan
import Bantuan from '../pages/Bantuan';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="pengajuan" element={<PengajuanPage />} />
        <Route path="bantuan" element={<Bantuan />} />
      </Route>
    </Routes>
  );
}

export default Router;