// src/layouts/LandingLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
