'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuItem from './MenuItem';
import { menuItems, categories, dietaryTags } from '@/data/menuData';

const PREFERENCES_STORAGE_KEY = 'foodOrder_preferences';

export default function MenuList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuListContent />
    </Suspense>
  );
}

function MenuListContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (savedPreferences) {
      try {
        const { category, dietary } = JSON.parse(savedPreferences);
        setSelectedCategory(category);
        setSelectedDietary(dietary);
      } catch (error) {
        console.error('Error parsing preferences:', error);
        localStorage.removeItem(PREFERENCES_STORAGE_KEY);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      category: selectedCategory,
      dietary: selectedDietary
    };
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  }, [selectedCategory, selectedDietary]);

  // Handle search from URL
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = selectedDietary.length === 0 || 
      selectedDietary.every(pref => item[pref]);
    
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const toggleDietaryFilter = (preference) => {
    setSelectedDietary(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  return (
    <section id="menu" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex space-x-4 min-w-max px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2
                  ${selectedCategory === category.name
                    ? 'bg-[--primary] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 min-w-max px-4">
            {Object.entries(dietaryTags).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleDietaryFilter(key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2
                  ${selectedDietary.includes(key)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{value.icon}</span>
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[--primary]"
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}