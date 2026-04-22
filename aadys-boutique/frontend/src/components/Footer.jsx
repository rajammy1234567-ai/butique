import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d0500] text-gray-300 mt-0">
      {/* Top footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-serif font-bold text-white">Aadyasbyanita</span>
              <span className="text-[#d4a853] font-semibold text-sm ml-2 tracking-widest uppercase">Boutique</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Premium ladies suits & ethnic wear from the heart of Punjab. Crafted with love, delivered with care.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/aadyasbyanita" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919029411841" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[#d4a853] transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-[#d4a853] transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-[#d4a853] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Contact</Link></li>
              <li><Link to="/products?tag=trending" className="hover:text-[#d4a853] transition-colors">Trending</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Policies</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4a853] transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#d4a853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="hover:text-white transition-colors cursor-pointer">+91-9029411841</p>
                  <p className="hover:text-white transition-colors cursor-pointer">+91-7402528888</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-[#d4a853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="break-all text-xs">nazaqatsuits1313@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#d4a853] flex-shrink-0 mt-0.5" />
                <p>Punjab, India</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} Aadyasbyanita. All Rights Reserved.</p>
          <p>Crafted with ❤️ for fashion lovers</p>
        </div>
      </div>
    </footer>
  );
}
