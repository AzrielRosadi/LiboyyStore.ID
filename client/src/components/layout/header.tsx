import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if current location starts with admin
  const isAdminPage = location.startsWith('/admin');

  // Don't show header on admin pages
  if (isAdminPage) {
    return null;
  }

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#services", label: "Layanan" },
    { href: "/#how-it-works", label: "Cara Kerja" },
    { href: "/#testimonials", label: "Testimoni" },
    { href: "/#track-order", label: "Cek Pesanan" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-primary text-2xl font-montserrat font-bold mr-1">Liboyy</span>
          <span className="text-secondary text-2xl font-montserrat font-bold">Store<span className="text-accent">.ID</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center">
          <Link href="/order-history" className="hidden md:inline-block bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors font-medium mr-4">
            Riwayat Pesanan
          </Link>
          <a href="#track-order" className="hidden md:inline-block bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors font-medium">
            Cek Pesanan
          </a>
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 focus:outline-none" 
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg rounded-b-lg px-4 py-2 absolute w-full ${mobileMenuOpen ? 'animate-fade-in' : 'hidden'}`}>
        <div className="flex flex-col space-y-3 pb-3">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <Link href="/order-history" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Riwayat Pesanan
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
