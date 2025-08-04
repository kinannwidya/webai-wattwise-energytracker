const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-[#0a0a12] to-[#0f172a] px-6 pt-20 pb-20 relative overflow-hidden"
    >

      <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        What Users Say
      </h2>

      {/* Container untuk membatasi lebar testimonial card */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 z-10 relative">
        {[
          {
            name: 'Alya',
            text: 'Very helpful for monitoring my home electricity!',
          },
          {
            name: 'Budi',
            text: 'The predictions are accurate and the interface is user-friendly.',
          },
          {
            name: 'Citra',
            text: 'Easy to use, even for my parents!',
          },
        ].map((testi, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a] border border-cyan-500/20 p-6 rounded-xl shadow-md text-left"
          >
            <p className="italic text-gray-200 mb-4">"{testi.text}"</p>
            <p className="font-semibold text-cyan-400">- {testi.name}</p>
          </div>
        ))}
      </div>

      {/* Glowing background effect */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500 opacity-15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 opacity-15 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Testimonials;
