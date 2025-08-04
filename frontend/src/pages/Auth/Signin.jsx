// src/pages/Auth/Signin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { motion } from 'framer-motion';

function Signin() {
  const navigate = useNavigate();
  const { openRegister, closeModal } = useAuthModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    if (email === 'us@example.com' && password === 'pass123') {
      closeModal();
      navigate('/dashboard');
    } else {
      alert('Email or password is incorrect!');
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form
        onSubmit={handleSignin}
        className="p-8 rounded-xl shadow-inner w-full border border-cyan-500/20"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Welcome Back
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-cyan-100">Email</label>
            <input
              type="email"
              placeholder="us@example.com"
              className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-cyan-100">Password</label>
            <input
              type="password"
              placeholder="pass123"
              className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-cyan-200">
              Don't have an account?{' '}
              <span
                onClick={() => openRegister()}
                className="text-cyan-400 hover:underline cursor-pointer font-medium"
              >
                Register
              </span>
            </p>
            <a href="#" className="text-sm text-cyan-400 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Optional decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      </form>
    </motion.div>
  );
}

export default Signin;