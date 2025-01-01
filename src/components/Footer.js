'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useToast } from '@/context/ToastContext';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { showToast } = useToast();
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    showToast('Thanks for subscribing!', 'success');
    e.target.reset();
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Partner With Us', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    services: [
      { name: 'Order Food', href: '#menu' },
      { name: 'Catering', href: '#' },
      { name: 'Corporate Orders', href: '#' },
      { name: 'Gift Cards', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: '#' },
    { name: 'Twitter', icon: FaTwitter, href: '#' },
    { name: 'Instagram', icon: FaInstagram, href: '#' },
    { name: 'LinkedIn', icon: FaLinkedin, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-[--primary] to-pink-500 bg-clip-text text-transparent">FoodOrder</h2>
            <p className="text-gray-400 leading-relaxed">
              Delivering happiness to your doorstep. Experience the finest cuisine from top restaurants.
            </p>
            {/* Social Links */}
            <div className="flex space-x-6 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-[--primary] transform hover:scale-110 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="text-2xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-xl font-semibold text-white capitalize after:content-[''] after:block after:w-12 after:h-1 after:bg-[--primary] after:mt-2">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center"
                    >
                      <span className="hover:underline decoration-[--primary]">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white after:content-[''] after:block after:w-12 after:h-1 after:bg-[--primary] after:mt-2">Newsletter</h3>
            <p className="text-gray-400 leading-relaxed">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                  focus:ring-[--primary] focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[--primary] to-pink-500 hover:from-pink-500 hover:to-[--primary]
                  text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* App Badges */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-6">
              <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/app-store-badge.png"
                  alt="Download on App Store"
                  width={140}
                  height={42}
                  className="brightness-110"
                />
              </a>
              <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="brightness-110"
                />
              </a>
            </div>
            <div className="mt-6 sm:mt-0 text-center sm:text-right">
              <p className="text-gray-400">
                © {currentYear || ''} FoodOrder. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gray-950/80 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-white hover:underline decoration-[--primary] transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white hover:underline decoration-[--primary] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white hover:underline decoration-[--primary] transition-colors">Cookies</Link>
            </div>
            <div className="mt-4 sm:mt-0">
              Made with <span className="text-red-500">❤️</span> by <span className="text-[--primary] font-semibold">rolandaayo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
