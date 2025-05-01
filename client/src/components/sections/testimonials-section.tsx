const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "\"Top up ML cepat banget, ga sampe 5 menit langsung masuk. Harga juga lebih murah dari tempat lain. Recommended!\""
    },
    {
      id: 2,
      name: "Siti Nuraini",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.5,
      text: "\"Followers IG nambah banyak sesuai pesanan. Admin ramah dan fast respon. Pasti order lagi deh!\""
    },
    {
      id: 3,
      name: "Reza Mahendra",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      text: "\"Layanan 10/10! Top up FF lancar, proses cepat, harga bersahabat. Admin juga sabar banget jawab pertanyaan. The best!\""
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Testimoni Pelanggan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Apa kata pelanggan kami tentang layanan LiboyyStore.ID?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
