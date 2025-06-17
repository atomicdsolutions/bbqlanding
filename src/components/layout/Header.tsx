import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md' 
          : 'bg-[#2D1843]'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Logo 
                width={120}
                height={48}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                scrolled ? 'text-[#5D2E8C] hover:text-[#DAB03C]' : 'text-white hover:text-[#DAB03C]'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/#services" 
              className={`font-medium transition-colors ${
                scrolled ? 'text-[#5D2E8C] hover:text-[#DAB03C]' : 'text-white hover:text-[#DAB03C]'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/menu" 
              className={`font-medium transition-colors ${
                scrolled ? 'text-[#5D2E8C] hover:text-[#DAB03C]' : 'text-white hover:text-[#DAB03C]'
              }`}
            >
              Menu
            </Link>
            <Link 
              href="/#testimonials" 
              className={`font-medium transition-colors ${
                scrolled ? 'text-[#5D2E8C] hover:text-[#DAB03C]' : 'text-white hover:text-[#DAB03C]'
              }`}
            >
              Testimonials
            </Link>
            <Link 
              href="/#consultation" 
              className={`font-medium transition-colors ${
                scrolled ? 'text-[#5D2E8C] hover:text-[#DAB03C]' : 'text-white hover:text-[#DAB03C]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/#consultation" 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                scrolled 
                  ? 'bg-[#5D2E8C] text-white hover:bg-[#2D1843]' 
                  : 'bg-[#DAB03C] text-white hover:bg-[#B99029]'
              } shadow-lg hover:shadow-xl`}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus:outline-none transition-colors ${
              scrolled ? 'text-[#5D2E8C]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 mt-2 border-t border-gray-200 bg-white">
            <nav className="flex flex-col">
              <Link 
                href="/" 
                className="text-[#5D2E8C] hover:text-[#DAB03C] font-medium px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#services" 
                className="text-[#5D2E8C] hover:text-[#DAB03C] font-medium px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/menu" 
                className="text-[#5D2E8C] hover:text-[#DAB03C] font-medium px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-[#5D2E8C] hover:text-[#DAB03C] font-medium px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="/#consultation" 
                className="text-[#5D2E8C] hover:text-[#DAB03C] font-medium px-4 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 pt-2">
                <Link 
                  href="/#consultation" 
                  className="px-6 py-3 bg-[#5D2E8C] text-white hover:bg-[#2D1843] rounded-lg font-semibold inline-block w-full text-center shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;