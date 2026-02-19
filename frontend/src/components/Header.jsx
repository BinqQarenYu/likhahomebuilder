import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4D600' }}>
              <Home className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">LIKHA</h1>
              <p className="text-xs text-gray-400 -mt-1">Home Builders</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#C4D600]'
                    : 'text-white hover:text-[#C4D600]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+6328123456"
              className="flex items-center gap-2 text-sm text-white hover:text-[#C4D600] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+63 (2) 8123-4567</span>
            </a>
            <a
              href="mailto:info@likhahomebuilders.com"
              className="flex items-center gap-2 text-sm text-white hover:text-[#C4D600] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@likhahomebuilders.com</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-zinc-800">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold transition-colors ${
                      isActive(link.path)
                        ? 'text-[#C4D600]'
                        : 'text-white hover:text-[#C4D600]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-zinc-800 pt-6 space-y-4">
                  <a
                    href="tel:+6328123456"
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+63 (2) 8123-4567</span>
                  </a>
                  <a
                    href="mailto:info@likhahomebuilders.com"
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@likhahomebuilders.com</span>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;