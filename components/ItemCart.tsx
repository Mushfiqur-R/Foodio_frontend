

'use client';

import Image from 'next/image';
import Button from './Button';
import { Plus } from 'lucide-react';

type FoodItemCardProps = {
  imageSrc: string;
  imageAlt: string;
  itemName: string;
  description: string;
  price: number;
  onAddToOrder?: () => void;
  className?: string;
};

export default function FoodItemCard({
  imageSrc,
  imageAlt,
  itemName,
  description,
  price,
  onAddToOrder,
  className,
}: FoodItemCardProps) {
  return (
    <div
      className={`
        relative
        w-[280px] 
        h-[300px]
        bg-[#FEF7EA]
        shadow-lg
        hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        ${className || ''}
      `}
    //   style={{
    //     borderTopLeftRadius: '34px',
    //     borderBottomRightRadius: '34px',
    //   }}
    style={{
  borderTopRightRadius: '34px',
  borderBottomLeftRadius: '34px',
}}
    >
      {/* Image Container - positioned absolutely with overflow */}
      <div 
        className="absolute"
        style={{
          width: '222px',
          height: '222px',
          top: '-60px',
          left: '-50px',
          zIndex: 10,
        }}
      >
        {/* <div className="relative w-full h-full object-cover">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{ borderRadius: '100px' }}
            sizes="222px"
          />
        </div> */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="absolute left-[56px] right-[20px] top-[150px]">
        {/* Item Name */}
        <h3 className="font-semibold text-[18px] leading-[24px] text-[#1A1A1A] mb-1">
          {itemName}
        </h3>

        {/* Description */}
        <p className="font-normal text-[13px] leading-[18px] text-[#666666] mb-3">
          {description}
        </p>

        {/* Price */}
        <p className="font-bold text-[24px] leading-[32px] text-[#1A1A1A] mb-4">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Add to Order Button - positioned absolutely at bottom */}
      <div 
        className="absolute"
        style={{
          bottom: '5px',
          left: '75%',
          transform: 'translateX(-50%) translateY(50%)',
          
        }}
      >
        <Button
          text="Add to order"
          icon={Plus}
          iconPosition="right"
          iconSize={18}
          width="w-[140px]"
          height="h-[45px]"
          bgColor="#1A3C34"
          textColor="#FFFFFF"
          onClick={onAddToOrder}
          className="font-semibold"
        />
      </div>
    </div>
  );
}

