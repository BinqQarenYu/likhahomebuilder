import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${API}/newsletter`, { email });
      
      toast({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter',
      });
      
      setEmail('');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to subscribe. Please try again.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Stay Updated with Our Latest Projects
          </h3>
          <p className="text-gray-400 mb-6">Subscribe to our newsletter for exclusive offers and updates</p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-zinc-700 text-white"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#C4D600', color: '#000' }}
              className="font-bold"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 pt-12 border-t border-zinc-800">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4D600' }}>
                <Home className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">LIKHA</h3>
                <p className="text-xs text-gray-400 -mt-1">Home Builders</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Building your dream modular homes with quality, efficiency, and affordability.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#C4D600] transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#C4D600] transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#C4D600] transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-[#C4D600] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-[#C4D600] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-[#C4D600] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-[#C4D600] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-[#C4D600] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C4D600] mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  123 Construction Ave, Building District, Manila 1234, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C4D600] flex-shrink-0" />
                <a href="tel:+6328123456" className="text-sm text-gray-400 hover:text-[#C4D600]">
                  +63 (2) 8123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C4D600] flex-shrink-0" />
                <a href="mailto:info@likhahomebuilders.com" className="text-sm text-gray-400 hover:text-[#C4D600]">
                  info@likhahomebuilders.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Copyright 2024 – LIKHA HOME BUILDERS ®. All rights reserved.
            </p>
            <p className="text-sm text-red-500 font-semibold">
              PIRACY IS A CRIME - Authorized Dealer Only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;