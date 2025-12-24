'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSIdebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Check if user is admin on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      console.log('🔍 Checking auth...');
      console.log('Token exists:', !!token);
      console.log('User exists:', !!userStr);

      if (!token) {
        console.log('❌ No token - redirecting to /auth');
        router.push('/auth');
        return;
      }

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const role = user.role?.toLowerCase();

          console.log('User role:', role);

          if (role !== 'admin') {
            console.log('❌ Not admin - redirecting to customer dashboard');
            router.push('/auth');
            return;
          }

          console.log('✅ Admin access granted');
        } catch (error) {
          console.error('Error parsing user data:', error);
          router.push('/auth');
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex h-screen bg-[#F5F5F0]">
      {/* Sidebar - shared across all admin pages */}
      <AdminSidebar />

      {/* Main Content - renders child pages */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}