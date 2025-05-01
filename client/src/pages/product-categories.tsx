import { useState } from 'react';
import { useLocation } from 'wouter';
import { categories } from '@/lib/product-categories';
import { 
  AnimatedContainer, 
  AnimatedText,
  FadeInStagger,
  FadeInItem,
  fadeInItemVariants 
} from '@/components/ui/animated-container';
import { RippleButton } from '@/components/ui/ripple-button';

export default function ProductCategories() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<'games' | 'social-media'>('games');

  const filteredCategories = categories.filter(cat => cat.category === activeCategory);

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedContainer className="text-center mb-12" animation="fadeIn">
          <AnimatedText 
            text="Layanan Kami" 
            element="h1" 
            className="text-4xl font-montserrat font-bold text-gray-800 mb-3"
          />
          <AnimatedText 
            text="Pilih layanan yang kamu butuhkan dengan harga terbaik" 
            element="p"
            className="text-gray-600 max-w-2xl mx-auto"
            delay={0.3}
          />
        </AnimatedContainer>

        {/* Kategori Tab */}
        <div className="flex justify-center gap-4 mb-8">
          <RippleButton
            variant={activeCategory === 'games' ? 'filled' : 'outline'}
            color="primary"
            size="lg"
            onClick={() => setActiveCategory('games')}
            className="py-2 px-6"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Game Top Up
            </span>
          </RippleButton>
          <RippleButton
            variant={activeCategory === 'social-media' ? 'filled' : 'outline'}
            color="primary"
            size="lg"
            onClick={() => setActiveCategory('social-media')}
            className="py-2 px-6"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Jasa Social Media
            </span>
          </RippleButton>
        </div>

        {/* Daftar Kategori Produk */}
        <FadeInStagger 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          staggerChildren={0.1}
          delay={0.2}
        >
          {filteredCategories.map((category) => (
            <FadeInItem 
              key={category.id}
              variants={fadeInItemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer relative group"
              onClick={() => setLocation(`/product/${category.id}`)}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-xl">{category.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <RippleButton
                  color="primary"
                  fullWidth
                  className="py-2.5"
                >
                  Lihat Opsi
                </RippleButton>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </div>
  );
}