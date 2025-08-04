import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Testimonials from './Testimonials'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default LandingPage
