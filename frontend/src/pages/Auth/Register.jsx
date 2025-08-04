// src/pages/Auth/Register.jsx
import { useState } from 'react';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { motion } from 'framer-motion';

function Register() {
  const { openSignin } = useAuthModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      openSignin();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form 
        onSubmit={handleRegister} 
        className="p-8 rounded-xl shadow-lg w-full max-w-2xl border border-cyan-500/20"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Create Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-cyan-100">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-cyan-100">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-cyan-100">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-cyan-100">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#1e293b] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <motion.button 
            type="submit" 
            className="w-full md:w-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>

          <p className="text-sm text-cyan-200 text-center mt-4">
            Already have an account?{' '}
            <span
              onClick={() => openSignin()}
              className="text-cyan-400 hover:underline cursor-pointer font-medium"
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

export default Register;