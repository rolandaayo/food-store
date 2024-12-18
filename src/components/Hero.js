'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative pt-32 pb-40 flex content-center items-center justify-center min-h-[85vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-7/12 text-center">
            {/* Badge */}
            <div className="inline-block mb-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full animate-bounce">
              <span className="text-white/90 font-medium">
                🚀 Free delivery for orders over $50
              </span>
            </div>

            {/* Main Text */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <TypeAnimation
                sequence={[
                  'Delicious Food',
                  1000,
                  'Amazing Taste',
                  1000,
                  'Quick Delivery',
                  1000,
                  'Delicious Food',
                ]}
                wrapper="span"
                speed={50}
                className="block"
              />
              <TypeAnimation
                sequence={[
                  'Delivered to You',
                  1000,
                  'At Your Doorstep',
                  1000,
                  'Just for You',
                  1000,
                  'Delivered to You',
                ]}
                wrapper="span"
                speed={50}
                className="block text-[--primary] mt-2"
              />
            </h1>
            
            <p className="mt-4 text-xl leading-relaxed text-white/80 mb-12 max-w-2xl mx-auto opacity-0 animate-fadeIn">
              <TypeAnimation
                sequence={[
                  500,
                  'Experience the finest cuisine from top restaurants, delivered right to your doorstep. Fresh ingredients, amazing taste, and lightning-fast delivery.',
                ]}
                wrapper="span"
                speed={70}
                cursor={false}
              />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fadeIn animation-delay-700">
              <button 
                onClick={scrollToMenu}
                className="button-primary group transform hover:scale-105 transition-all duration-300"
              >
                Order Now
                <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToMenu}
                className="px-8 py-3 rounded-full border-2 border-white/30 text-white 
                  hover:bg-white/10 transition-colors duration-300 transform hover:scale-105"
              >
                View Menu
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto opacity-0 animate-fadeIn animation-delay-1000">
              {[
                { number: '30+', label: 'Restaurant Partners' },
                { number: '1000+', label: 'Food Items' },
                { number: '99%', label: 'Satisfied Customers' },
              ].map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
} 