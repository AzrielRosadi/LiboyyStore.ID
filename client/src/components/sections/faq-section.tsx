import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const FaqSection = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: 1,
      question: "Berapa lama proses top up game?",
      answer: "Proses top up game biasanya membutuhkan waktu 1-15 menit setelah konfirmasi pembayaran kami terima. Dalam kondisi server ramai, mungkin bisa mencapai maksimal 1 jam.",
      isOpen: false
    },
    {
      id: 2,
      question: "Apakah followers Instagram real atau bot?",
      answer: "Kami menyediakan dua jenis layanan: followers real dengan engagement tinggi (lebih mahal) dan followers reguler yang berasal dari berbagai sumber. Keduanya aman untuk akun Anda.",
      isOpen: false
    },
    {
      id: 3,
      question: "Bagaimana cara konfirmasi pembayaran?",
      answer: "Setelah melakukan pembayaran, Anda perlu mengisi form konfirmasi pembayaran dengan melampirkan bukti transfer. Kami akan memproses pesanan Anda segera setelah konfirmasi diterima.",
      isOpen: false
    },
    {
      id: 4,
      question: "Apakah layanan LiboyyStore.ID aman?",
      answer: "Ya, layanan kami 100% aman. Kami tidak memerlukan password akun Anda, hanya ID/username yang diperlukan untuk proses top up atau penambahan followers/likes.",
      isOpen: false
    },
    {
      id: 5,
      question: "Bagaimana jika pesanan tidak masuk?",
      answer: "Jika dalam 24 jam pesanan Anda belum diproses, silakan hubungi customer service kami melalui WhatsApp. Kami akan segera menyelesaikan masalah atau memberikan refund jika diperlukan.",
      isOpen: false
    }
  ]);

  const toggleFaq = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id 
        ? { ...faq, isOpen: !faq.isOpen } 
        : faq
    ));
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Pertanyaan Umum</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Temukan jawaban atas pertanyaan yang sering ditanyakan</p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              viewport={{ once: false, amount: 0.3 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <motion.button 
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-all"
                whileHover={{ backgroundColor: '#f0f7ff' }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="font-medium">{faq.question}</span>
                <motion.i 
                  className={`fas fa-chevron-down text-primary`}
                  animate={{ 
                    rotate: faq.isOpen ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.i>
              </motion.button>

              <AnimatePresence>
                {faq.isOpen && (
                  <motion.div 
                    className="bg-white p-4 border-t border-gray-200"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.3,
                        },
                        opacity: {
                          duration: 0.3,
                          delay: 0.1
                        }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.3,
                        },
                        opacity: {
                          duration: 0.2
                        }
                      }
                    }}
                  >
                    <motion.p 
                      className="text-gray-600"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p className="text-gray-600 mb-4">Masih punya pertanyaan?</p>
          <motion.a
            href="https://wa.me/6282211944285" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg shadow-md hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-whatsapp mr-2 text-lg"></i>
            Tanya Customer Service
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
