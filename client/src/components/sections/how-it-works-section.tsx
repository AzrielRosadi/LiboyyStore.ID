const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Pilih Produk",
      description: "Pilih produk dan layanan yang Anda inginkan dari katalog kami"
    },
    {
      number: 2,
      title: "Isi Data",
      description: "Isi data akun game atau social media Anda dengan benar"
    },
    {
      number: 3,
      title: "Pembayaran",
      description: "Lakukan pembayaran melalui metode pembayaran yang tersedia dan jangan lupa salin ID pesanan, contoh: ORD-HLGV7S. Dan menggunakan ID tersebut untuk Melihat Pesanan anda pada bagian Cari Pesanan."
    },
    {
      number: 4,
      title: "Konfirmasi",
      description: "Konfirmasi pembayaran Anda bisa Langsung mengirimkan Detail Pesanan ke WhatsApp Admin agar langsung bisa Diproses dengan Klik Icon WhatsApp pada Hubungi Admin. Dan tunggu pesanan Anda."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Cara Kerja</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Proses order cepat dan mudah dalam 4 langkah sederhana</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#services" className="inline-block bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg transition-colors shadow-md font-medium">
            Mulai Order Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
