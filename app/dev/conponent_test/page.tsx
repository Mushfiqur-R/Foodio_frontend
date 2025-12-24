'use client';

import Button from "@/components/Button";
import Logo from "@/components/Logo";


// import { useState } from 'react';
// import Input from '@/components/InputTextBox';
// import Button from '@/components/Button';
// import { Plus } from 'lucide-react';
// import logoImage from "../assets/foodio.jpg";
// import Logo from '@/components/Logo';
// export default function InputTestPage() {
//   const [text, setText] = useState('');

//   return (
//     <>


// {/* #E6E2D87D */}
// <Button
//   text="Register"
//   icon={Plus}
//   iconPosition="right"
//   iconSize={16}
//   width="w-[120px]"
//   height="h-[36px]"
//   bgColor="#E6E2D87D"      // deep green
//   textColor="#0c0b0bff"        // white
//   onClick={()=>{}}
// />

// <Input
//   placeholder="Email"
//   value=""
//   type='password'
//   width="w-[398px]"
//   height="h-[36px]"
// />
//   <Logo />

// </>
//   );
// }




import FoodItemCard from '@/components/ItemCart';








import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import AdminSidebar from "@/components/AdminSIdebar";

// Example type for food items from database
type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function MenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetch from database/API
  useEffect(() => {
    // Replace this with your actual API call
    const fetchFoodItems = async () => {
      try {
        // const response = await fetch('/api/food-items');
        // const data = await response.json();
        
        // Mock data - replace with actual API call
        const mockData: FoodItem[] = [
          {
    id: '1',
    name: 'Golden Crunch Bite',
    description: 'Delicious crunchy treat.',
    price: 5.99,
    imageUrl: '/images/golden_crunch_bite.png', // relative path from public
  },
          // {
          //   id: '2',
          //   name: 'Kacchi Biryani',
          //   description: 'Traditional slow-cooked biryani with tender mutton and aromatic basmati rice.',
          //   price: 18.50,
          //   imageUrl: '/assets/', // DB theke asbe
          // },
          // {
          //   id: '3',
          //   name: 'Truffle Pasta',
          //   description: 'Fresh pasta with black truffle and parmesan cream.',
          //   price: 22.00,
          //   imageUrl: 'https://example.com/pasta.jpg', // DB theke asbe
          // },
        ];

        setFoodItems(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleAddToOrder = (itemId: string, itemName: string) => {
    console.log(`Added ${itemName} (ID: ${itemId}) to order`);
    // Your cart logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-[#666666]">Loading menu...</p>
      </div>
    );
  }

  return (
<>
 
   <AdminSidebar/>
  </>

  );
}