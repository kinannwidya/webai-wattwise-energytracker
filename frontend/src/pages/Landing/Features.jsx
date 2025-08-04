import { motion } from "framer-motion"
import { LucideBolt, LineChart, Brain } from "lucide-react"

const features = [
  {
    icon: <LucideBolt className="w-10 h-10 text-cyan-400 drop-shadow-neon" />,
    title: "Realtime Monitoring",
    desc: "Track your daily electricity consumption live and accurately."
  },
  {
    icon: <LineChart className="w-10 h-10 text-cyan-400 drop-shadow-neon" />,
    title: "Usage Forecast",
    desc: "Predict your electricity needs for the next 7 days with smart AI models."
  },
  {
    icon: <Brain className="w-10 h-10 text-cyan-400 drop-shadow-neon" />,
    title: "Billing Estimation",
    desc: "Get accurate billing estimates based on your real-time and forecasted usage."
  }
]

export default function Features() {
  return (
    <section id="features" className="bg-[#0a0a12] py-24 px-6 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Energy Flow Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-16 max-w-2xl mx-auto text-base md:text-lg"
        >
          Manage your energy smarter—from monitoring to forecasting and optimization. All in one intelligent flow.
        </motion.p>

        <div className="relative z-10">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/20 
  shadow-[0_0_30px_#00f2] hover:shadow-[0_0_80px_#00f5] 
  hover:bg-[#112240] hover:border-cyan-400 transition-all duration-300"

              >
                <div className="flex items-center justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-cyan-300">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background waves */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f2] via-transparent to-transparent opacity-10 animate-pulse" />
      </div>
    </section>
  )
}
