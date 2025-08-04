const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-t from-[#0a0a12] via-[#0f172a] to-[#0a1120] text-white py-14 border-t border-cyan-500 shadow-inner shadow-blue-900/50"
    >
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 px-6 md:px-20">
        {/* Kiri: Brand + Navigasi */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-md">WattWise</h3>
          <p className="text-sm text-cyan-100 mb-6 max-w-md">
            A smart solution to monitor and predict electricity usage.
          </p>
          <div>
            <h4 className="text-lg font-semibold text-cyan-300 mb-3 drop-shadow-md">Navigation</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cyan-100">
              <li><a href="#hero" className="hover:text-white transition-all duration-200">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-all duration-200">Features</a></li>
              <li><a href="#howitworks" className="hover:text-white transition-all duration-200">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-all duration-200">Testimonials</a></li>
            </ul>
          </div>
        </div>

        {/* Kanan: Kontak */}
        <div className="md:pl-12">
          <h4 className="text-lg font-semibold text-cyan-300 mb-3 drop-shadow-md">Contact</h4>
          <p className="text-sm text-cyan-100 mb-2">Email: support@wattwise.nan</p>
          <p className="text-sm text-cyan-100 mb-2">WhatsApp: +62 xxx-xxxx-xxxx</p>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm mt-10 text-cyan-400 tracking-wide">
        &copy; 2025 WattWise. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
