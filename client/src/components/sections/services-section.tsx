import { useCallback } from "react";
import { useLocation } from "wouter";
import { categories } from "@/lib/product-categories";
import { motion } from "framer-motion";
import {
  AnimatedContainer,
  AnimatedText,
  FadeInStagger,
  FadeInItem,
  fadeInItemVariants,
} from "@/components/ui/animated-container";
import { RippleButton } from "@/components/ui/ripple-button";

const ServicesSection = () => {
  const [, setLocation] = useLocation();

  const handleServiceClick = useCallback(
    (id: string) => {
      setLocation(`/product/${id}`);
    },
    [setLocation]
  );

  // Get showcase categories (first four categories)
  const showcaseCategories = categories.slice(0, 4);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedContainer className="text-center mb-12" animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">
              Layanan Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih berbagai layanan top up game dan jasa social media yang kami sediakan dengan harga terbaik
            </p>
          </div>
        </AnimatedContainer>

        <FadeInStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerChildren={0.1}
          delay={0.2}
        >
          {showcaseCategories.map((category) => (
            <FadeInItem
              key={category.id}
              variants={fadeInItemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
              onClick={() => handleServiceClick(category.id)}
              whileHover={{ scale: 1.05, y: -5 }}
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
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <motion.span
                    className={`
                      ${
                        category.category === "games"
                          ? "bg-blue-100 text-primary"
                          : "bg-purple-100 text-purple-600"
                      } 
                      rounded-full px-3 py-1 text-xs font-medium
                    `}
                    whileHover={{ scale: 1.1 }}
                  >
                    {category.category === "games" ? "Game" : "Social Media"}
                  </motion.span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <RippleButton color="primary" fullWidth className="py-2">
                  Beli Sekarang
                </RippleButton>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <AnimatedContainer
          className="mt-12 text-center"
          animation="fadeIn"
          delay={0.6}
        >
          <RippleButton
            variant="filled"
            color="primary"
            size="lg"
            withRipple
            onClick={() => setLocation("/products")}
            className="inline-flex items-center"
          >
            Lihat Semua Layanan
          </RippleButton>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
