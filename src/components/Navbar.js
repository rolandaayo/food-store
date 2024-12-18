'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { FaShoppingCart, FaUser, FaSearch, FaTimes } from 'react-icons/fa';
import { RiMenu3Fill } from 'react-icons/ri';
import Cart from './Cart';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const { cartItems } = useCart();
  const router = useRouter();
  const { showToast } = useToast();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCartOpen && !event.target.closest('.cart-container')) {
        setIsCartOpen(false);
      }
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }

    return () => {
      document.body.classList.remove('body-scroll-lock');
    };
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      showToast('Please enter a search term', 'info');
      return;
    }
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
    router.push(`/?search=${encodeURIComponent(searchQuery)}#menu`);
    showToast(`Searching for "${searchQuery}"`, 'info');
  };

  const handleUserClick = () => {
    showToast('User profile feature coming soon!', 'info');
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen && cartItems.length === 0) {
      showToast('Your cart is empty', 'info');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Welcome back to top!', 'success');
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        showToast(`Navigating to ${href.replace('#', '')}`, 'info');
      } else {
        showToast('Section not found', 'error');
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('/')}
              className={`text-2xl font-bold ${isScrolled ? 'text-[--primary]' : 'text-white'}`}
            >
              FoodOrder
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`font-medium transition-colors duration-200
                  ${isScrolled ? 'text-gray-600 hover:text-[--primary]' : 'text-white hover:text-gray-200'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xs mx-8"
          >
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for food..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[--primary] text-gray-800"
              />
              <button type="submit">
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[--primary]" />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <button 
              onClick={handleUserClick}
              className={`p-2 rounded-full transition-colors duration-200
                ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
            >
              <FaUser className={`text-xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            </button>

            {/* Cart */}
            <div className="cart-container relative">
              <button
                onClick={handleCartToggle}
                className={`relative p-2 rounded-full transition-colors duration-200
                  ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
              >
                <FaShoppingCart className={`text-xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                {totalItems > 0 && (
                  <span className="cart-badge">
                    {totalItems}
                  </span>
                )}
              </button>
              {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-200
                ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <FaTimes className={`text-xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <RiMenu3Fill className={`text-xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl 
            transform transition-transform duration-300 ease-in-out z-50
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes className="text-xl text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-[--primary]"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <FaSearch className="text-gray-400" />
                </button>
              </div>
            </form>

            {/* Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    scrollToSection(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-lg
                    text-gray-600 hover:text-[--primary] hover:bg-gray-50
                    transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* User Actions */}
            <div className="pt-4 border-t">
              <button
                onClick={handleUserClick}
                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg
                  text-gray-600 hover:text-[--primary] hover:bg-gray-50
                  transition-colors duration-200"
              >
                <FaUser />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
} 