'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { dietaryTags } from '@/data/menuData';
import Image from 'next/image';

export default function MenuItem({ item }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const getDietaryTags = () => {
    return Object.entries(dietaryTags).filter(([key]) => item[key]);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showToast(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden menu-item-hover">
      <div className="relative h-40 sm:h-48 md:h-56 group">
        {/* Skeleton loader */}
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300
            ${isImageLoading ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-700
            ${isImageLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
            group-hover:scale-110`}
          priority={item.popular}
          onLoadingComplete={() => setIsImageLoading(false)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick actions */}
        <div className="absolute top-4 right-4 space-y-2 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-red-500' : 'bg-white'
            } shadow-lg transition-colors duration-300`}
          >
            <FaHeart className={`text-lg ${isFavorite ? 'text-white' : 'text-red-500'}`} />
          </button>
        </div>

        {item.popular && (
          <span className="absolute top-4 left-4 bg-[--primary] text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            Popular
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 group-hover:text-[--primary] transition-colors line-clamp-1">
            {item.name}
          </h3>
          <span className="text-base sm:text-lg md:text-xl font-bold text-[--primary]">${item.price}</span>
        </div>
        
        {/* Dietary Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          {getDietaryTags().map(([key, value]) => (
            <span 
              key={key}
              className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
              title={value.label}
            >
              {value.icon} <span className="hidden sm:inline">{value.label}</span>
            </span>
          ))}
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            className="button-primary text-sm sm:text-base flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 group"
          >
            <FaShoppingCart className="group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
} 