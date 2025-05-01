import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { products } from '@/lib/data';

const ServicesSection = () => {
  const [, setLocation] = useLocation();
  
  const handleServiceClick = useCallback((category: string, id: string) => {
    setLocation(`/product/${category}/${id}`);
  }, [setLocation]);

  // Get one product from each category for display
  const showcaseProducts = [
    products.find(p => p.category === 'ml'),
    products.find(p => p.category === 'ff'),
    products.find(p => p.category === 'instagram'),
    products.find(p => p.category === 'tiktok')
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Pilih berbagai layanan top up game dan jasa social media yang kami sediakan dengan harga terbaik</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseProducts.map((product) => product && (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleServiceClick(product.category, product.id)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <span className={`
                    ${product.category === 'ml' || product.category === 'ff' ? 'bg-blue-100 text-primary' : 'bg-purple-100 text-purple-600'} 
                    rounded-full px-3 py-1 text-xs font-medium
                  `}>
                    {product.category === 'ml' || product.category === 'ff' ? 'Game' : 'Social Media'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <button className="block w-full bg-primary hover:bg-secondary text-white text-center py-2 rounded-lg transition-colors">
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
