// src/components/Sidebar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPengajuanOpen, setIsPengajuanOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const scrollToSection = (path, id) => {
    if (window.location.pathname !== path) {
      navigate(path, { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80; // Adjust this value based on your navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.replaceState({}, document.title);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isCollapsed ? -280 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`w-62 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-4 flex flex-col shadow-xl fixed top-0 left-0 h-[100dvh] z-40 border-r border-cyan-500/10`}
    >
      {/* Logo & Title - Fixed at the top */}
      {!isCollapsed && (
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 mb-2" />
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            WattWise
          </span>
          <p className="text-sm text-cyan-200 mt-1 text-center px-2">Smart electricity insights</p>
        </div>
      )}

      {/* Scrollable Navigation Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className={`space-y-1 ${isCollapsed ? 'hidden' : 'block'}`}>
          {/* Dashboard */}
          <div>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-cyan-500/10 transition"
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="text-cyan-400" size={20} />
                <span className="text-base font-semibold tracking-tight">Dashboard</span>
              </div>
              {isDashboardOpen ? (
                <ChevronUp size={16} className="text-cyan-300" />
              ) : (
                <ChevronDown size={16} className="text-cyan-300" />
              )}
            </button>
            {isDashboardOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 mt-1 space-y-1"
              >
                {[
                  { label: 'Realtime Monitoring', id: 'summary' },
                  { label: 'Usage Forecast', id: 'predict' },
                  { label: 'Billing Estimation', id: 'billing' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection('/dashboard', section.id)}
                    className="block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-cyan-500/10 text-cyan-100 transition"
                  >
                    {section.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Install Request */}
          <div>
            <button
              onClick={() => setIsPengajuanOpen(!isPengajuanOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-cyan-500/10 transition"
            >
              <div className="flex items-center space-x-2">
                <FileText className="text-cyan-400" size={20} />
                <span className="text-base font-semibold tracking-tight">Install Request</span>
              </div>
              {isPengajuanOpen ? (
                <ChevronUp size={16} className="text-cyan-300" />
              ) : (
                <ChevronDown size={16} className="text-cyan-300" />
              )}
            </button>
            {isPengajuanOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 mt-1 space-y-1"
              >
                <button
                  onClick={() => scrollToSection('/dashboard/pengajuan', 'ajukan-pengajuan')}
                  className="block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-cyan-500/10 text-cyan-100 transition"
                >
                  New Request
                </button>
                <button
                  onClick={() => scrollToSection('/dashboard/pengajuan', 'status-pengajuan')}
                  className="block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-cyan-500/10 text-cyan-100 transition"
                >
                  Request Status
                </button>
              </motion.div>
            )}
          </div>

          {/* Help */}
          <NavLink
            to="/dashboard/bantuan"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold tracking-tight transition ${isActive ? 'bg-cyan-500/20' : 'hover:bg-cyan-500/10'
              }`
            }
          >
            <HelpCircle className="text-cyan-400" size={20} />
            <span>Help</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout - Fixed at the bottom */}
      {!isCollapsed && (
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center w-full px-3 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-base font-semibold tracking-tight transition"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </motion.button>
      )}
    </motion.div>
  );
};

export default Sidebar;