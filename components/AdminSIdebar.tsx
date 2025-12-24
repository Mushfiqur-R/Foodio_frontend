'use client';

import { useRouter, usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth');
    }
  };

  const navItems = [
    {
      name: 'Menu Items',
      icon: '☰',
      path: '/admin/menu-items',
    },
    {
      name: 'Orders',
      icon: '📦',
      path: '/admin/orders',
    },
  ];

  return (
    <div className="w-[170px] bg-[#F5F5F0] border-r border-[#E6E2D8] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg mb-1 text-sm font-medium transition ${
              pathname === item.path
                ? 'bg-[#1A3C34] text-white'
                : 'text-white hover:bg-[#1A3C34]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition"
      >
        <span className="text-base">↩</span>
        Sign Out
      </button>
    </div>
  );
}