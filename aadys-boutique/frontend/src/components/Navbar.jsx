import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Heart, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      {/* Top announcement bar */}
      <div className="bg-[#1a0a00] text-white text-center text-xs py-1.5 font-medium tracking-wide">
        🎉 Free Shipping on Orders Above ₹500 &nbsp;|&nbsp; COD Available &nbsp;|&nbsp; Easy Returns
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-xl md:text-2xl font-bold font-serif text-[#1a0a00] group-hover:text-[#8b6914] transition-colors">
              Aadyasbyanita
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold text-[#8b6914] tracking-widest uppercase">Boutique</span>
              <span className="text-[9px] text-gray-400 hidden sm:block">Premium Ethnic Wear</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(link.to)
                    ? 'text-[#8b6914]'
                    : 'text-gray-700 hover:text-[#8b6914]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#8b6914] transition-all duration-300 ${isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-[#8b6914] transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d62445] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-1.5 text-gray-700 hover:text-[#8b6914] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#f5e9c8] flex items-center justify-center text-[#8b6914] font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#faf7f4] hover:text-[#8b6914] transition" onClick={() => setShowUserMenu(false)}>
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#faf7f4] hover:text-[#8b6914] transition" onClick={() => setShowUserMenu(false)}>
                        <ShoppingBag className="w-4 h-4" /> My Orders
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#8b6914] font-semibold hover:bg-[#faf7f4] transition border-t border-gray-100" onClick={() => setShowUserMenu(false)}>
                          👑 Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100">
                        ↩ Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 bg-[#1a0a00] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#3d1a00] transition">
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-[#8b6914] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2.5 text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#8b6914]' : 'text-gray-700 hover:text-[#8b6914]'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link to="/profile" className="block py-2.5 text-sm text-gray-700" onClick={() => setIsOpen(false)}>My Profile</Link>
                  <Link to="/orders" className="block py-2.5 text-sm text-gray-700" onClick={() => setIsOpen(false)}>My Orders</Link>
                  {user?.isAdmin && (
                    <Link to="/admin/dashboard" className="block py-2.5 text-sm text-[#8b6914] font-semibold" onClick={() => setIsOpen(false)}>👑 Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="block py-2.5 text-sm text-red-500 font-semibold">Logout</button>
                </div>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 mt-3 bg-[#1a0a00] text-white px-5 py-2.5 rounded-full text-sm font-semibold w-fit" onClick={() => setIsOpen(false)}>
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
