// 'use client';

// type ButtonProps = {
//   text: string;
//   width?: string;       // ex: "w-[398px]"
//   height?: string;      // ex: "h-[36px]"
//   onClick?: () => void;
//   className?: string;   // extra styling override
// };

// export default function Button({
//   text,
//   width = 'w-[398px]',
//   height = 'h-[36px]',
//   onClick,
//   className,
// }: ButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         ${width} ${height}
//         bg-[#1A3C34] 
//         text-white 
//         font-medium text-[14px] leading-[20px] tracking-[-0.15px]
//         text-center
//         rounded-[56px]
//         flex items-center justify-center
//         hover:brightness-110
//         transition
//         ${className || ''}
//       `}
//     >
//       {text}
//     </button>
//   );
// }

'use client';

import { LucideIcon } from 'lucide-react';

type ButtonProps = {
  text: string;
  icon?: LucideIcon;                     // Optional icon
  iconPosition?: 'left' | 'right';       // Icon side
  iconSize?: number;                     // Icon width & height
  width?: string;                        // ex: "w-[398px]"
  height?: string;                       // ex: "h-[36px]"
  bgColor?: string;                       // Background color
  textColor?: string;                     // Text color
  onClick?: () => void;
  className?: string;
};

export default function Button({
  text,
  icon: Icon,
  iconPosition = 'left',
  iconSize = 16,
  width = 'w-[398px]',
  height = 'h-[36px]',
  bgColor = '#1A3C34',        // default bg color
  textColor = '#FFFFFF',       // default text color
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${width} ${height}
        ${bgColor ? '' : ''}  // bg color will be applied inline
        font-medium text-[14px] leading-[20px] tracking-[-0.15px]
        rounded-[56px]
        flex items-center justify-center relative
        hover:brightness-110
        transition
        ${className || ''}
      `}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Optional Icon */}
      {Icon && (
        <Icon
          size={iconSize}
          className={`absolute top-1/2 -translate-y-1/2 ${
            iconPosition === 'left' ? 'left-[12px]' : 'right-[12px]'
          }`}
        />
      )}

      {/* Button Text */}
      {text}
    </button>
  );
}
