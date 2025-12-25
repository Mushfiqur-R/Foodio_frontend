'use client';

import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

type SuccessToastProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
};

export default function SuccessToast({
  isOpen,
  onClose,
  itemName,
  autoClose = true,
  autoCloseDelay = 3000,
}: SuccessToastProps) {
  // Auto close after delay
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] animate-slideDown">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-100 px-6 py-4 flex items-center gap-3 min-w-[300px]">
        {/* Success Icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle size={20} className="text-white" />
          </div>
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-gray-800 font-medium text-[15px]">
            {itemName} Ordered Successfully!
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress Bar (optional) */}
      {autoClose && (
        <div className="h-1 bg-gray-100 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-green-500 animate-shrink"
            style={{ 
              animation: `shrink ${autoCloseDelay}ms linear forwards` 
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-shrink {
          animation: shrink 3s linear forwards;
        }
      `}</style>
    </div>
  );
}