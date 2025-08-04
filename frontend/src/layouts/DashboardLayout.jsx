// src/layouts/DashboardLayout.jsx

import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ChevronLeft, ChevronRight, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const displayName = user?.name || user?.email || 'User';

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100); // Delay for rendering
      }
    }
  }, [location.state]);

  const toggleSidebar = (e) => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    e.currentTarget.blur();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 relative">
      
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`fixed top-7 -translate-y-1/2 z-40 p-1.5 text-blue-400 hover:text-white transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'left-4' : 'left-50 md:left-[16.5rem]'}`}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={20} className="stroke-[2.5]" />
          ) : (
            <ChevronLeft size={20} className="stroke-[2.5]" />
          )}
        </button>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-gray-800/75 backdrop-blur-sm shadow-md z-30">

        {/* User Info */}
        <div className="h-full flex items-center justify-end px-8">
          <div className="flex items-center space-x-3">
            <span className="text-sm md:text-base font-medium">{displayName}</span>
            <UserCircle className="text-blue-300" size={22} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`flex-1 px-4 md:px-8 overflow-y-auto transition-all duration-300 ease-in-out pt-20 ${
          isSidebarCollapsed ? '' : 'ml-64'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
