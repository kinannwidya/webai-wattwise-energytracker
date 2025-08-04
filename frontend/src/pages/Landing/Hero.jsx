import { motion } from "framer-motion"
import { useAuthModal } from "../../contexts/AuthModalContext"

export default function Hero() {
  const { openRegister } = useAuthModal()

  return (
    // src/components/Hero.jsx
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-[#00040f] via-[#0d1b46] to-[#1a2d59] text-white flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* ⚡ Background FX: Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03] z-0 pointer-events-none"></div>

      {/* 🎇 Radial Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-cyan-700/10 pointer-events-none z-0" />

      {/* 🔵 Neon Blur Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] opacity-80 animate-pulse-slow"></div>
      </div>
      <div className="absolute top-[20%] left-[70%] w-72 h-72 bg-[#5ce1e6]/20 rounded-full blur-[100px] opacity-50 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[15%] right-[70%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] opacity-40 animate-pulse-slow pointer-events-none" />

      {/* ✨ Extra Floating Dots */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-[4px] h-[4px] bg-cyan-400 rounded-full opacity-30 animate-floating"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🎯 Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl z-10 pt-16 md:pt-0"
      >
        <p className="text-sm uppercase tracking-widest text-[#5ce1e6] mb-3">
          WattWise
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-7">
          Smart Energy <br />
          <span className="text-[#5ce1e6] drop-shadow-[0_0_6px_#5ce1e6aa] hover:drop-shadow-[0_0_12px_#5ce1e6ff] transition">
            Insights for Every Space
          </span>
        </h1>

        <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
          A smart solution to monitor and predict electricity usage<br />
          Save energy, cut costs, and take control
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={() => openRegister()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-xl hover:scale-105 hover:from-cyan-400 hover:to-blue-700 transition duration-300"
          >
            Get Started
          </button>

          <a
            href="#features"
            className="text-white font-medium underline text-base hover:text-[#5ce1e6] transition duration-200"
          >
            Learn more →
          </a>
        </div>
      </motion.div>

      {/* 🖱️ Scroll For More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <motion.div
          className="w-1 h-8 bg-gray-400 mb-2 rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-sm text-gray-400">Scroll for more</p>
      </motion.div>
    </section>

  )
}
