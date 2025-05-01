import { FC } from 'react';

export const WhatsAppButton: FC = () => {
  const phoneNumber = "6282211944285";
  
  return (
    <a 
      href={`https://wa.me/${phoneNumber}`} 
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp text-2xl"></i>
    </a>
  );
};
