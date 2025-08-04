// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

import { UserCircle } from "lucide-react";
import { useAuthModal } from '../contexts/AuthModalContext';

const Navbar = () => {
  const { openSignin, openRegister } = useAuthModal();

  return (
    <motion.nav
      className="bg-gradient-to-r from-[#1e1f24] via-[#2c2e33] to-[#1e1f24] backdrop-blur-lg shadow-lg px-8 md:px-16 py-3 md:py-4 flex justify-between items-center fixed w-full top-0 z-50 border-b border-[#ffffff20]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left: Logo & Title */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="hidden md:block w-10 h-10 object-contain" />
        <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
          WattWise
        </span>
      </Link>

      {/* Center: Navigation links */}
      <div className="hidden md:flex space-x-6">
        <a href="#hero" className="text-gray-300 hover:text-cyan-400 transition">Home</a>
        <a href="#features" className="text-gray-300 hover:text-cyan-400 transition">Features</a>
        <a href="#howitworks" className="text-gray-300 hover:text-cyan-400 transition">How It Works</a>
        <a href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition">Testimonials</a>
        <a href="#footer" className="text-gray-300 hover:text-cyan-400 transition">Contact</a>
      </div>

      {/* Right: Desktop Auth buttons and profile icon */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={openRegister}
          className="text-cyan-400 border border-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-950/30 transition"
        >
          Sign Up
        </button>
        <button
          onClick={openSignin}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl transition"
        >
          Sign In
        </button>
        <UserCircle className="text-2xl text-gray-300 hover:text-cyan-400 cursor-pointer transition" />
      </div>

      {/* Right: Mobile Auth Buttons */}
      <div className="md:hidden flex items-center gap-2">
         <button
    onClick={openRegister}
    className="text-cyan-400 border border-cyan-400 text-sm px-3 py-1.5 rounded-lg hover:bg-cyan-950/30 transition"
  >
    Sign Up
  </button>
        <button
          onClick={openSignin}
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
        >
          Sign In
        </button>
        <UserCircle className="text-xl text-gray-300 hover:text-cyan-400 cursor-pointer transition" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
