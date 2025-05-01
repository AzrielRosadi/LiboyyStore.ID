import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Pilih berbagai layanan top up game dan jasa social media yang kami sediakan dengan harga terbaik</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {showcaseProducts.map((product, index) => product && (
            <motion.div 
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => handleServiceClick(product.category, product.id)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
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
                  <motion.span 
                    className={`
                      ${product.category === 'ml' || product.category === 'ff' ? 'bg-blue-100 text-primary' : 'bg-purple-100 text-purple-600'} 
                      rounded-full px-3 py-1 text-xs font-medium
                    `}
                    whileHover={{ scale: 1.1 }}
                  >
                    {product.category === 'ml' || product.category === 'ff' ? 'Game' : 'Social Media'}
                  </motion.span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <motion.button 
                  className="block w-full bg-primary hover:bg-secondary text-white text-center py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Beli Sekarang
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.button 
            className="inline-flex items-center px-6 py-3 text-white font-medium bg-primary rounded-lg shadow-md hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-aos="fade-up"
            onClick={() => setLocation('/product/ml/ml001')}
          >
            Lihat Semua Layanan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
