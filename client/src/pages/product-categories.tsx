import { useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { categories } from '@/lib/product-categories';
import { motion } from 'framer-motion';
import { 
  AnimatedContainer, 
  AnimatedText,
  FadeInStagger, 
  FadeInItem,
  fadeInItemVariants
} from '@/components/ui/animated-container';
import { RippleButton } from '@/components/ui/ripple-button';
import { initAOS } from '@/lib/animation';

export default function ProductCategories() {
  const [, setLocation] = useLocation();
  
  // Inisialisasi AOS saat komponen dimuat
  useEffect(() => {
    initAOS();
    window.scrollTo(0, 0);
  }, []);
  
  const handleCategoryClick = useCallback((id: string) => {
    setLocation(`/product/${id}`);
  }, [setLocation]);

  return (
    <>
      
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer 
            className="text-center mb-12"
            animation="fadeIn"
          >
            <AnimatedText 
              text="Semua Layanan" 
              element="h1" 
              className="text-4xl font-montserrat font-bold text-gray-800 mb-3"
            />
            <AnimatedText 
              text="Pilih layanan yang Anda butuhkan dengan harga terbaik" 
              element="p"
              className="text-gray-600 max-w-2xl mx-auto"
              delay={0.3}
            />
          </AnimatedContainer>
          
          {/* Section : Game */}
          <div className="mb-12">
            <AnimatedContainer 
              className="mb-6"
              animation="fadeIn"
            >
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-3 text-gray-800">Game</h2>
            </AnimatedContainer>
            
            <FadeInStagger 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              staggerChildren={0.1}
              delay={0.2}
            >
              {categories.filter(cat => cat.category === 'games').map((category) => (
                <FadeInItem 
                  key={category.id}
                  variants={fadeInItemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <RippleButton
                      color="primary"
                      fullWidth
                      className="py-2"
                    >
                      Pilih {category.name}
                    </RippleButton>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
          
          {/* Section : Social Media */}
          <div>
            <AnimatedContainer 
              className="mb-6"
              animation="fadeIn"
            >
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 text-gray-800">Social Media</h2>
            </AnimatedContainer>
            
            <FadeInStagger 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              staggerChildren={0.1}
              delay={0.2}
            >
              {categories.filter(cat => cat.category === 'social-media').map((category) => (
                <FadeInItem 
                  key={category.id}
                  variants={fadeInItemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <RippleButton
                      color="secondary"
                      fullWidth
                      className="py-2"
                    >
                      Pilih {category.name}
                    </RippleButton>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </div>
    </>
  );
}