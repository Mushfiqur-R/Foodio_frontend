'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

type NavigationProps = {
  className?: string;
};

const Navigation = ({ className }: NavigationProps) => {
  const [activeLink, setActiveLink] = useState('Home');
  const router = useRouter();

  // Hard-coded navigation links without using href
  const links = [
    { name: 'Home', route: '/' },
    { name: 'Food Menus', route: '/menu' },
    { name: 'My Orders', route: '/orders' },
  ];

  const handleNavigation = (name: string, route: string) => {
    setActiveLink(name);
    router.push(route); // SPA navigation, no refresh
  };

  return (
    <nav
      className={`
        w-full 
        h-[64px] 
        px-8 
        flex 
        items-center 
        justify-between
        bg-white
        border-b-2 
        border-[#E8E4DB]
        ${className || ''}
      `}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-0">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavigation(link.name, link.route)}
            className={`
              px-4 py-2
              font-medium text-[14px] leading-[20px]
              transition-all duration-200
              hover:text-[#1A3C34]
              ${activeLink === link.name ? 'text-[#1A3C34] font-semibold' : 'text-[#666666]'}
            `}
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Sign In Button */}
      <div className="flex-shrink-0">
        <Button
          text="Sign in"
          icon={ArrowRight}
          iconPosition="right"
          iconSize={16}
          width="w-[100px]"
          height="h-[40px]"
          bgColor="#1A3C34"
          textColor="#FFFFFF"
          onClick={() => router.push('/auth')}
          className="font-semibold"
        />
      </div>
    </nav>
  );
};

export default Navigation;
