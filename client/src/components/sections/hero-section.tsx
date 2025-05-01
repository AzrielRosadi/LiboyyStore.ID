const HeroSection = () => {
  return (
    <section id="home" className="pt-28 pb-16 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-gray-800 leading-tight mb-4">
              Top Up Game & Social Media <span className="text-primary">Terpercaya</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Dapatkan layanan top up game dan jasa social media dengan harga terbaik dan proses cepat. 100% aman dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a href="#services" className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg transition-colors shadow-md font-medium text-center">
                Lihat Layanan
              </a>
              <a href="#how-it-works" className="bg-white hover:bg-gray-100 text-primary border border-primary py-3 px-6 rounded-lg transition-colors font-medium text-center">
                Cara Kerja
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Gaming Experience" 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
        
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-primary text-3xl mb-2">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="font-semibold">100% Aman</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-primary text-3xl mb-2">
              <i className="fas fa-bolt"></i>
            </div>
            <h3 className="font-semibold">Proses Cepat</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-primary text-3xl mb-2">
              <i className="fas fa-tags"></i>
            </div>
            <h3 className="font-semibold">Harga Bersaing</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-primary text-3xl mb-2">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="font-semibold">Layanan 24 Jam</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
