// 'use client';

// import { useState } from 'react';
// import Navigation from "@/components/Navigation";
// import ItemCart from '@/components/ItemCart';
// import Button from '@/components/Button';
// import Image from 'next/image';
// import { ChefHat, UtensilsCrossed, Cake } from 'lucide-react';

// export default function HomePage() {
//   // Sample food items data - replace with actual API data
//   const foodItems = [
//     {
//       id: '1',
//       name: 'Golden Crunch Bites',
//       description: 'Jumbo scallops with cauliflower purée and truffle oil.',
//       price: 15.0,
//       imageUrl: '/images/golden-crunch_bites.jpg',
//     },
//     {
//       id: '2',
//       name: 'Mediterranean Olive Medley',
//       description: 'Jumbo scallops with cauliflower purée and truffle oil.',
//       price: 25.0,
//       imageUrl:  '/images/golden-crunch_bites.jpg',
//     },
//     {
//       id: '3',
//       name: 'Citrus Swirl Delights',
//       description: 'Jumbo scallops with cauliflower purée and truffle oil.',
//       price: 35.0,
//       imageUrl:  '/images/golden-crunch_bites.jpg',
//     },
//     {
//       id: '4',
//       name: 'Creamy Garlic Shrimp Pasta',
//       description: 'Jumbo scallops with cauliflower purée and truffle oil.',
//       price: 10.0,
//       imageUrl:  '/images/golden-crunch_bites.jpg',
//     },
//   ];

//   const categories = [
//     { name: 'Starters', icon: ChefHat },
//     { name: 'Main Courses', icon: UtensilsCrossed },
//     { name: 'Desserts', icon: Cake },
//   ];

//   const handleAddToOrder = (itemId: string, itemName: string) => {
//     console.log(`Added ${itemName} to order`);
//     // Add your cart logic here
//   };

//   const handleOrderNow = () => {
//     console.log('Order Now clicked');
//     // Navigate to menu or order page
//   };

//   const handleViewMenu = () => {
//     console.log('View Menu clicked');
//     // Navigate to menu page
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAF8]">
//       {/* Navigation */}
//       <Navigation />

//       {/* Hero Section */}
//       <section className="relative w-full h-[600px] bg-gradient-to-br from-[#F8F6F1] to-[#FEF7EA] overflow-hidden">
//         <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
//           {/* Left Content */}
//           <div className="flex-1 max-w-[600px] z-10">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm">
//               <span className="w-2 h-2 bg-[#1A3C34] rounded-full animate-pulse"></span>
//               <span className="text-[14px] font-medium text-[#1A3C34]">
//                 Food Ordering Service
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 
//               className="text-[72px] font-bold leading-[1.1] mb-6 text-[#1A1A1A]"
//               style={{ fontFamily: 'Playfair Display, serif' }}
//             >
//               Where Great Food
//               <br />
//               Meets Great Taste.
//             </h1>

//             {/* Description */}
//             <p className="text-[18px] leading-[28px] text-[#666666] mb-8 max-w-[500px]">
//               Experience a symphony of flavors crafted with passion. Premium ingredients, 
//               exquisite recipes, delivered to your door.
//             </p>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-4">
//               <Button
//                 text="Order Now"
//                 iconPosition="right"
//                 width="w-[160px]"
//                 height="h-[52px]"
//                 bgColor="#1A3C34"
//                 textColor="#FFFFFF"
//                 onClick={handleOrderNow}
//                 className="font-semibold text-[16px]"
//               />
//               <Button
//                 text="View Menu"
//                 width="w-[160px]"
//                 height="h-[52px]"
//                 bgColor="transparent"
//                 textColor="#1A3C34"
//                 onClick={handleViewMenu}
//                 className="font-semibold text-[16px] border-2 border-[#1A3C34]"
//               />
//             </div>
//           </div>

//           {/* Right Image - Circular Frame */}
//           <div className="relative flex-shrink-0">
//             {/* Background Frame */}
//             <div
//               className="absolute bg-[#FEF7EA]"
//               style={{
//                 width: '608px',
//                 height: '565px',
//                 borderBottomLeftRadius: '210px',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: 1,
//               }}
//             />

//             {/* Food Image */}
//             <div
//               className="relative"
//               style={{
//                 width: '474px',
//                 height: '474px',
//                 borderRadius: '222px',
//                 overflow: 'hidden',
//                 zIndex: 2,
//                 marginTop: '-32px',
//                 marginLeft: '32px',
//               }}
//             >
//               <Image
//                 src="/images/golden_crunch_bite.jpg" // Replace with your image
//                 alt="Delicious pasta dish"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Curated Categories Section */}
//       <section className="max-w-[1400px] mx-auto px-8 py-20">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 
//             className="text-[48px] font-bold text-[#1A1A1A] mb-4"
//             style={{ fontFamily: 'Playfair Display, serif' }}
//           >
//             Curated Categories
//           </h2>
//           <p className="text-[18px] text-[#666666]">
//             Explore our diverse menu of culinary delights.
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//           {categories.map((category) => {
//             const IconComponent = category.icon;
//             return (
//               <div
//                 key={category.name}
//                 className="flex flex-col items-center justify-center p-8 bg-[#FEF7EA] rounded-3xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
//               >
//                 <div className="w-16 h-16 bg-[#1A3C34] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <IconComponent size={28} className="text-white" />
//                 </div>
//                 <h3 className="text-[20px] font-semibold text-[#1A1A1A]">
//                   {category.name}
//                 </h3>
//               </div>
//             );
//           })}
//         </div>

//         {/* Food Items Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 justify-items-center">
//           {foodItems.map((item) => (
//             <ItemCart
//               key={item.id}
//               imageSrc={item.imageUrl}
//               imageAlt={item.name}
//               itemName={item.name}
//               description={item.description}
//               price={item.price}
//               onAddToOrder={() => handleAddToOrder(item.id, item.name)}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Footer Spacing */}
//       <div className="h-20"></div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Navigation from "@/components/Navigation";
import ItemCart from '@/components/ItemCart';
import Button from '@/components/Button';
import { ChefHat, UtensilsCrossed, Cake } from 'lucide-react';

export default function HomePage() {
  // Sample food items data - replace with actual API data
  const foodItems = [
    {
      id: '1',
      name: 'Golden Crunch Bites',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 15.0,
      imageUrl: '/images/golden_crunch_bite.png',
    },
    {
      id: '2',
      name: 'Mediterranean Olive Medley',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 25.0,
      imageUrl: '/images/golden_crunch_bite.png',
    },
    {
      id: '3',
      name: 'Citrus Swirl Delights',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 35.0,
      imageUrl: '/images/golden_crunch_bite.png',
    },
    {
      id: '4',
      name: 'Creamy Garlic Shrimp Pasta',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 10.0,
      imageUrl: '/images/golden_crunch_bite.png',
    },
  ];

  const categories = [
    { name: 'Starters', icon: ChefHat },
    { name: 'Main Courses', icon: UtensilsCrossed },
    { name: 'Desserts', icon: Cake },
  ];

  const handleAddToOrder = (itemId: string, itemName: string) => {
    console.log(`Added ${itemName} to order`);
    // Add your cart logic here
  };

  const handleOrderNow = () => {
    console.log('Order Now clicked');
    // Navigate to menu or order page
  };

  const handleViewMenu = () => {
    console.log('View Menu clicked');
    // Navigate to menu page
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-[650px] bg-gradient-to-br from-[#F8F6F1] to-[#FEF7EA] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 py-12 flex items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-[600px] z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#1A3C34] rounded-full animate-pulse"></span>
              <span className="text-[14px] font-medium text-[#1A3C34]">
                Food Ordering Service
              </span>
            </div>

            {/* Heading */}
            <h1 
              className="text-[72px] font-bold leading-[1.1] mb-6 text-[#1A1A1A]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Where Great Food
              <br />
              Meets Great Taste.
            </h1>

            {/* Description */}
            <p className="text-[18px] leading-[28px] text-[#666666] mb-8 max-w-[500px]">
              Experience a symphony of flavors crafted with passion. Premium ingredients, 
              exquisite recipes, delivered to your door.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                text="Order Now"
                iconPosition="right"
                width="w-[160px]"
                height="h-[52px]"
                bgColor="#1A3C34"
                textColor="#FFFFFF"
                onClick={handleOrderNow}
                className="font-semibold text-[16px]"
              />
              <Button
                text="View Menu"
                width="w-[160px]"
                height="h-[52px]"
                bgColor="transparent"
                textColor="#1A3C34"
                onClick={handleViewMenu}
                className="font-semibold text-[16px] border-2 border-[#1A3C34]"
              />
            </div>
          </div>

 
          <div className="relative flex-shrink-0" style={{ width: '608px', height: '565px' }}>
            {/* Background Frame with bottom-left radius */}
            <div
              className="absolute bg-[#FEF7EA]"
              style={{
                width: '608px',
                height: '56px',
                borderBottomLeftRadius: '210px',
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />

            {/* Food Image - Circular with exact positioning */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: '474px',
                height: '474px',
                borderRadius: '237px',
                top: '45px',
                left: '67px',
                zIndex: 2,
              }}
            >
              <img
                src="/images/dashboardnoodles.png"
                alt="Delicious pasta dish"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Categories Section */}
      <section className="max-w-[1400px] mx-auto px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-[48px] font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Curated Categories
          </h2>
          <p className="text-[18px] text-[#666666]">
            Explore our diverse menu of culinary delights.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="flex flex-col items-center justify-center p-8 bg-[#FEF7EA] rounded-3xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#1A3C34] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={28} className="text-white" />
                </div>
                <h3 className="text-[20px] font-semibold text-[#1A1A1A]">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 justify-items-center">
          {foodItems.map((item) => (
            <ItemCart
              key={item.id}
              imageSrc={item.imageUrl}
              imageAlt={item.name}
              itemName={item.name}
              description={item.description}
              price={item.price}
              onAddToOrder={() => handleAddToOrder(item.id, item.name)}
            />
          ))}
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  );
}