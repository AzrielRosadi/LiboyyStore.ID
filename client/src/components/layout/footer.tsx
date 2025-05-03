import { useLocation } from 'wouter';

const Footer = () => {
  const [location] = useLocation();
  
  // Check if current location starts with admin
  const isAdminPage = location.startsWith('/admin');

  // Don't show footer on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">LiboyyStore.ID</h3>
            <p className="text-gray-400 mb-4">Layanan top up game dan social media terpercaya dengan harga terbaik dan proses cepat.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/liboyy_store26/" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/6282211944285" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Legends</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Free Fire</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram Followers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram Likes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">TikTok Followers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">TikTok Likes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Kontak Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cara Pembayaran</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fab fa-whatsapp text-gray-400 mr-2 mt-1"></i>
                <span className="text-gray-400">+62 822-1194-4285</span>
              </li>
              <li className="flex items-start">
                <i className="far fa-envelope text-gray-400 mr-2 mt-1"></i>
                <span className="text-gray-400">punyamalibatubara@gmail.com</span>
              </li>
              <li className="flex items-start">
                <i className="far fa-clock text-gray-400 mr-2 mt-1"></i>
                <span className="text-gray-400">09.00 - 21.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LiboyyStore.ID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
