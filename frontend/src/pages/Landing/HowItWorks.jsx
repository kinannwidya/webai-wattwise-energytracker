// src/pages/Landing/HowItWorks.jsx
import { motion } from "framer-motion";
import { useAuthModal } from "../../contexts/AuthModalContext";

const steps = [
  {
    title: "1. Create an Account",
    desc: "Register easily to get started with our smart energy monitoring service."
  },
  {
    title: "2. Request Installation",
    desc: "Submit a request, and our team will contact you to schedule the installation."
  },
  {
    title: "3. Installation",
    desc: "Our technician installs the smart watt device at your location."
  },
  {
    title: "4. Monitor in Real-Time",
    desc: "Track your daily electricity consumption in real-time through the dashboard."
  }
];

export default function HowItWorks() {
  const { openRegister } = useAuthModal();
  return (
    <section id="howitworks" className="bg-gradient-to-b from-[#0a0a12] to-[#0f172a] text-white py-24 px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          How It Works
        </motion.h2>

        <div className="relative">
          {/* Wave Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[4px] h-full z-0">
            <svg height="100%" width="4">
              <defs>
                <linearGradient id="pulseLine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#00a8ff" />
                </linearGradient>
              </defs>
              <path
                d="
                  M 2 0
                  Q 10 50, 2 100
                  T 2 200
                  T 2 300
                  T 2 400
                  T 2 500
                "
                stroke="url(#pulseLine)"
                strokeWidth="4"
                strokeDasharray="8"
                fill="transparent"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * idx }}
                  viewport={{ once: true }}
                  className={`w-full md:w-[48%] absolute ${isLeft ? "left-0 text-right" : "right-0 text-left"
                    }`}
                  style={{ top: `${idx * 130}px` }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-cyan-300">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">{step.desc}</p>
                </motion.div>
              );
            })}
            <div className="h-[500px]"></div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center mt-[20px]">
          <motion.button
            onClick={openRegister}
            className="z-20 bg-zinc-100 text-cyan-800 font-semibold px-8 py-4 rounded-full
    shadow-[0_0_16px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.6)]
    transition hover:scale-105 ring-1 ring-cyan-300/20"
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>

        </div>

        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      </div>
    </section>
  );
}