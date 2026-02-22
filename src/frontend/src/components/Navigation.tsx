import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from './CartSidebar';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Products', id: 'products' },
    { label: 'About', id: 'about' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-kraft shadow-md' : 'bg-kraft/95'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-burgundy rounded-lg"
            >
              <img
                src="/assets/generated/beat-o-beet-logo.dim_800x800.png"
                alt="Beat o Beet"
                className="h-14 w-14"
              />
              <span className="font-script text-2xl text-burgundy hidden sm:inline">
                beat o beet
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-brown font-medium hover:text-burgundy transition-colors duration-200 focus:outline-none focus:text-burgundy"
                >
                  {link.label}
                </button>
              ))}
              
              {/* Admin Links */}
              <Link
                to="/admin/dashboard"
                className="text-brown font-medium hover:text-burgundy transition-colors duration-200 focus:outline-none focus:text-burgundy"
              >
                Admin
              </Link>
              
              <Link
                to="/admin/products"
                className="text-brown font-medium hover:text-burgundy transition-colors duration-200 focus:outline-none focus:text-burgundy"
              >
                Admin Products
              </Link>
              
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-brown hover:text-burgundy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-burgundy rounded-lg"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-cream text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu and Cart Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-brown hover:text-burgundy transition-colors duration-200"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-cream text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-brown hover:text-burgundy"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-brown font-medium hover:text-burgundy transition-colors duration-200 text-left py-2 px-4 rounded-lg hover:bg-cream focus:outline-none focus:bg-cream"
                  >
                    {link.label}
                  </button>
                ))}
                
                {/* Admin Links in Mobile Menu */}
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brown font-medium hover:text-burgundy transition-colors duration-200 text-left py-2 px-4 rounded-lg hover:bg-cream focus:outline-none focus:bg-cream"
                >
                  Admin
                </Link>
                
                <Link
                  to="/admin/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brown font-medium hover:text-burgundy transition-colors duration-200 text-left py-2 px-4 rounded-lg hover:bg-cream focus:outline-none focus:bg-cream"
                >
                  Admin Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
