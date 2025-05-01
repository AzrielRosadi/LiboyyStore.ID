import { useState } from 'react';

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-3">Pertanyaan Umum</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Temukan jawaban atas pertanyaan yang sering ditanyakan</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <i className={`fas fa-chevron-down text-primary transition-transform duration-300 ${faq.isOpen ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`bg-white p-4 border-t border-gray-200 ${faq.isOpen ? 'block' : 'hidden'}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
