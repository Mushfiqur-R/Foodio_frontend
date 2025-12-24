'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavigationAfterLogin from '@/components/NavigationAfterLogin';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    console.log('🔍 Checking USER auth...');

    if (!token || !userStr) {
      console.log('❌ Not logged in → redirect /auth');
      router.replace('/auth');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const role = user.role?.toLowerCase();

      console.log('User role:', role);

      // 🔐 USER CHECK
      if (role !== 'user') {
        console.log('❌ Not user → redirect admin');
        router.replace('/customer/Dashboard');
        return;
      }

      console.log('✅ User access granted');
    } catch (error) {
      console.error('User parse error:', error);
      router.replace('/auth');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Top Navigation */}
      <NavigationAfterLogin />

      {/* Page Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-6">
        {children}
      </main>
    </div>
  );
}
