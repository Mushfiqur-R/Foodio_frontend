'use client';

import { useState } from 'react';
import FoodItemCard from '@/components/ItemCart';

type MenuItem = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  itemName: string;
  description: string;
  price: number;
  category: 'all' | 'starters' | 'main' | 'desserts';
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    imageSrc: '/images/golden_crunch_bite.png',
    imageAlt: 'Golden Crunch Bites',
    itemName: 'Golden Crunch Bites',
    description: 'Jumbo scallops with cauliflower purée and truffle oil.',
    price: 15.00,
    category: 'starters',
  },
  {
    id: 2,
    imageSrc: '/images/golden_crunch_bite.png',
    imageAlt: 'Mediterranean Olive Medley',
    itemName: 'Mediterranean Olive Medley',
    description: 'Jumbo scallops with cauliflower purée and truffle oil.',
    price: 15.00,
    category: 'starters',
  },
  {
    id: 3,
    imageSrc: '/images/golden_crunch_bite.png',
    imageAlt: 'Citrus Swirl Delights',
    itemName: 'Citrus Swirl Delights',
    description: 'Jumbo scallops with cauliflower purée and truffle oil.',
    price: 15.00,
    category: 'desserts',
  },
  {
    id: 4,
    imageSrc: '/images/golden_crunch_bite.png',
    imageAlt: 'Creamy Garlic Shrimp Pasta',
    itemName: 'Creamy Garlic Shrimp Pasta',
    description: 'Jumbo scallops with cauliflower purée and truffle oil.',
    price: 15.00,
    category: 'main',
  },
];

type CategoryType = 'all' | 'starters' | 'main' | 'desserts';

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToOrder = (itemName: string) => {
    console.log(`Added ${itemName} to order`);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl mb-4 text-[#1A1A1A]">
            Our Menu
          </h1>
          <p className="text-[#666666] text-lg">
            Discover our selection of premium dishes, crafted with passion.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory('all')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm transition-all
              ${activeCategory === 'all' 
                ? 'bg-[#1A3C34] text-white' 
                : 'bg-white text-[#1A3C34] border border-[#E5E5E5] hover:border-[#1A3C34]'
              }
            `}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('starters')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm transition-all
              ${activeCategory === 'starters' 
                ? 'bg-[#1A3C34] text-white' 
                : 'bg-white text-[#1A3C34] border border-[#E5E5E5] hover:border-[#1A3C34]'
              }
            `}
          >
            Starters
          </button>
          <button
            onClick={() => setActiveCategory('main')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm transition-all
              ${activeCategory === 'main' 
                ? 'bg-[#1A3C34] text-white' 
                : 'bg-white text-[#1A3C34] border border-[#E5E5E5] hover:border-[#1A3C34]'
              }
            `}
          >
            Main Courses
          </button>
          <button
            onClick={() => setActiveCategory('desserts')}
            className={`
              px-6 py-2 rounded-full font-medium text-sm transition-all
              ${activeCategory === 'desserts' 
                ? 'bg-[#1A3C34] text-white' 
                : 'bg-white text-[#1A3C34] border border-[#E5E5E5] hover:border-[#1A3C34]'
              }
            `}
          >
            Desserts
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 mt-20">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <FoodItemCard
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                itemName={item.itemName}
                description={item.description}
                price={item.price}
                onAddToOrder={() => handleAddToOrder(item.itemName)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}