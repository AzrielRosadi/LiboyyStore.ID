import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
      },
    },
  };

  const featureItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="pt-28 pb-16 bg-gradient-to-r from-blue-100 via-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            data-aos="fade-right"
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-gray-800 leading-tight mb-4"
              variants={fadeInUp}
              custom={1}
            >
              Top Up Game & Social Media{" "}
              <span className="text-primary relative inline-block">
                Terpercaya
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-6"
              variants={fadeInUp}
              custom={2}
            >
              Dapatkan layanan top up game dan jasa social media dengan harga
              terbaik dan proses cepat. 100% aman dan terpercaya.
            </motion.p>
            <motion.p
              className="text-red-600 text-sm"
              variants={fadeInUp}
              custom={3}
            >
              NOTE: Sebelum melakukan pemesanan alangkah baiknya membaca cara
              pemesanannya terlebih dahulu.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
              variants={fadeInUp}
              custom={3}
            >
              <motion.a
                href="#services"
                className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg transition-colors shadow-md font-medium text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Layanan
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="bg-white hover:bg-gray-100 text-primary border border-primary py-3 px-6 rounded-lg transition-colors font-medium text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cara Kerja
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            data-aos="fade-left"
          >
            <motion.img
              src="/images/logoliboyynew.png"
              alt="Gaming Experience"
              className="rounded-lg shadow-lg w-full h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {[
            { icon: "shield-alt", title: "100% Aman" },
            { icon: "bolt", title: "Proses Cepat" },
            { icon: "tags", title: "Harga Bersaing" },
            { icon: "headset", title: "Layanan 24 Jam" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={featureItem}
              whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-primary text-3xl mb-2"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
              >
                <i className={`fas fa-${feature.icon}`}></i>
              </motion.div>
              <h3 className="font-semibold">{feature.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
