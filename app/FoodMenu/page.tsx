'use client';

import { useState, useEffect } from 'react';
import FoodItemCard from '@/components/ItemCart';
import OrderAmount from '@/components/OrderAmount';
import axios from 'axios';
import SuccessToast from '@/components/SuccessToster';
import Navigation from '@/components/Navigation';

type MenuItem = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  itemName: string;
  description: string;
  price: number;
  category: 'all' | 'starters' | 'main' | 'desserts';
};

type CategoryType = 'all' | 'starters' | 'main' | 'desserts';

type SelectedMenuItem = {
  menuItemId: number;
  name: string;
  price: number;
};

type OrderData = {
  menuItemId: number;
  quantity: number;
};

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedMenuItem | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successItemName, setSuccessItemName] = useState('');
  // API থেকে menu items fetch করা
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'all' 
          ? 'http://localhost:3000/user/menu'
          : `http://localhost:3000/user/menu?category=${activeCategory}`;
        
        const response = await axios.get(url);
        
        const formattedItems: MenuItem[] = response.data.map((item: any) => ({
          id: item.id,
          imageSrc: item.imageUrl 
            ? `http://localhost:3000${item.imageUrl}` 
            : '/images/golden_crunch_bite.png',
          imageAlt: item.name,
          itemName: item.name,
          description: item.description,
          price: parseFloat(item.price),
          category: item.category?.name?.toLowerCase() as 'starters' | 'main' | 'desserts'
        }));
        
        setMenuItems(formattedItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [activeCategory]);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Handle "Add to Order" button click - Opens OrderAmount modal
  const handleAddToOrder = (itemId: number, itemName: string, price: number) => {
    setSelectedItem({
      menuItemId:Number(itemId),
      name: itemName,
      price: price,
    });
    setIsModalOpen(true);
  };

  // Handle confirm from OrderAmount modal - Place order
  const handleConfirmOrder = async (orderData: OrderData) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to place an order');
        window.location.href = '/auth';
        return;
      }

      console.log('📦 Placing order:', orderData);

      // Place order API call
      const response = await axios.post(
        'http://localhost:3000/user/placeorder',
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('✅ Order placed:', response.data);

      // Show success message
      setSuccessItemName(selectedItem?.name || 'Item');
      setShowSuccessToast(true);

    } catch (error: any) {
      console.error('❌ Error placing order:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('Session expired. Please login again.');
          window.location.href = '/auth';
        } else {
          alert(`Failed to place order: ${error.response?.data?.message || 'Unknown error'}`);
        }
      } else {
        alert('Failed to place order. Please try again.');
      }
    }
  };

  return (
    <>
     <Navigation/>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1A3C34] border-r-transparent"></div>
            <p className="text-[#666666] mt-4">Loading menu items...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 mt-20">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-[#666666] text-lg">No items found in this category.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="flex justify-center">
                  <FoodItemCard
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    itemName={item.itemName}
                    description={item.description}
                    price={item.price}
                    onAddToOrder={() => handleAddToOrder(item.id, item.itemName, item.price)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* OrderAmount Modal */}
      {selectedItem && (
        <OrderAmount
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          menuItem={selectedItem}
          onConfirm={handleConfirmOrder}
        />
        
      )}
       
       
       <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        itemName={successItemName}
        autoClose={true}
        autoCloseDelay={3000}
      />
    </div>
    </>
  );
}