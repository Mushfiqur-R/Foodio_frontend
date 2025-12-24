
"use client"
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import AddNewItemModal from "@/components/AddNewItemModel";
import EditItemModal from "@/components/AddNewItemModel";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAuthConfig, requireAdmin } from "@/app/utils/auth";
 // Import from auth utils


type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  status: string;
  availableForOrder: boolean;
  categoryId?: number;
  rawPrice?: number;
};


type Category = {
  id: number;
  name: string;
};

type Order = {
  id: number;
  date: string;
  customer: string;
  total: string;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed';
};


export default function FoodioManagementDynamic() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<'menu' | 'orders'>('menu');
  const [activeTab, setActiveTab] = useState<'menuItems' | 'categories'>('menuItems');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Dynamic states
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

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
            router.push('/customer/dashboard');
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

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    console.log('\n=== FETCHING MENU ITEMS ===');
    try {
      setIsLoading(true);
      setError('');
      
      const config = getAuthConfig();
      console.log('Request config:', config);
      console.log('Request URL:', 'http://localhost:3000/admin/menu');
      
      const response = await axios.get('http://localhost:3000/admin/menu', config);
      
      console.log('Response status:', response.status);
      console.log('Response data length:', response.data?.length);
      
      // Transform backend data to match frontend structure
      const transformedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'N/A',
        categoryId: item.categoryId,
        price: `৳${item.price}`,
        rawPrice: item.price,
        description: item.description || '',
        image: item.imageUrl || undefined,
        status: item.isAvailable ? 'Available' : 'Unavailable',
        availableForOrder: item.isAvailable
      }));
      
      setMenuItems(transformedData);
      console.log('✅ Menu items loaded successfully!');
      
    } catch (error: any) {
      console.error('❌ Error fetching menu items:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => {
          router.push('/auth');
        }, 1500);
      } else {
        setError('Failed to load menu items');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    console.log('\n=== FETCHING CATEGORIES ===');
    try {
      setIsLoading(true);
      setError('');
      
      const config = getAuthConfig();
      console.log('Request config:', config);
      console.log('Request URL:', 'http://localhost:3000/admin/categories');
      
      const response = await axios.get('http://localhost:3000/admin/categories', config);
      
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      setCategories(response.data);
      console.log('✅ Categories loaded successfully!');
      
    } catch (error: any) {
      console.error('❌ Error fetching categories:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => {
          router.push('/auth');
        }, 1500);
      } else {
        setError('Failed to load categories');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    console.log('\n=== FETCHING ORDERS ===');
    try {
      setIsLoading(true);
      setError('');
      
      const config = getAuthConfig();
      console.log('Request config:', config);
      console.log('Request URL:', 'http://localhost:3000/admin/orders');
      
      const response = await axios.get('http://localhost:3000/admin/orders', config);
      
      console.log('Response status:', response.status);
      console.log('Response data length:', response.data?.length);
      
      // Transform backend data to match frontend structure
      const transformedOrders = response.data.map((order: any) => ({
        id: order.id,
        date: new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        customer: order.user?.name || order.user?.email || 'Unknown',
        total: `৳${order.totalPrice || 0}`,
        status: order.status || 'Pending'
      }));
      
      setOrders(transformedOrders);
      console.log('✅ Orders loaded successfully!');
      
    } catch (error: any) {
      console.error('❌ Error fetching orders:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => {
          router.push('/auth');
        }, 1500);
      } else {
        setError('Failed to load orders');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    if (currentPage === 'menu') {
      if (activeTab === 'menuItems') {
        fetchMenuItems();
      } else {
        fetchCategories();
      }
    } else if (currentPage === 'orders') {
      fetchOrders();
    }
  }, [currentPage, activeTab]);

  // Delete menu item
  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const config = getAuthConfig();
      await axios.delete(`http://localhost:3000/admin/deletemenuitem/${itemId}`, config);
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
      } else {
        alert('Failed to delete item');
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const config = getAuthConfig();
      await axios.delete(`http://localhost:3000/admin/deletecategory/${categoryId}`, config);
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
      } else {
        alert('Failed to delete category');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Preparing':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'Ready':
        return 'bg-[#D1FAE5] text-[#065F46]';
      case 'Completed':
        return 'bg-[#E5E7EB] text-[#374151]';
      default:
        return 'bg-[#E5E7EB] text-[#374151]';
    }
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: Order['status']
  ) => {
    try {
      const config = getAuthConfig();
      await axios.patch(`http://localhost:3000/admin/order/status/${orderId}`, {
        status: newStatus.toUpperCase(),
      }, config);

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error: any) {
      console.error('Error updating order status:', error);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
      } else {
        alert('Status update failed');
      }
    }
  };

  const handleItemSuccess = () => {
    console.log('Menu item created/updated successfully!');
    fetchMenuItems();
  };

  const handleCategorySuccess = () => {
    console.log('Category created/updated successfully!');
    fetchCategories();
  };

  const handleEditClick = (item: MenuItem) => {
    console.log('Edit clicked for item:', item);
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth');
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F0]">
      {/* Sidebar */}
      <div className="w-[170px] bg-[#F5F5F0] border-r border-[#E6E2D8] flex flex-col">
        <div className="p-6">
          <Logo />
        </div>

        <nav className="flex-1 px-3">
          <button
            onClick={() => setCurrentPage('menu')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg mb-1 text-sm font-medium transition ${
              currentPage === 'menu'
                ? 'bg-[#1A3C34] text-white'
                : 'text-[#7A7A7A] hover:bg-[#E6E2D8]'
            }`}
          >
            <span className="text-base">☰</span>
            Menu Items
          </button>
          
          <button
            onClick={() => setCurrentPage('orders')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              currentPage === 'orders'
                ? 'bg-[#1A3C34] text-white'
                : 'text-[#7A7A7A] hover:bg-[#E6E2D8]'
            }`}
          >
            <span className="text-base">📦</span>
            Orders
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition"
        >
          <span className="text-base">↩</span>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-[32px] font-semibold text-[#1A3C34] mb-8">
            {currentPage === 'menu' ? 'Menu Items' : 'Order Management'}
          </h1>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-4 text-center text-[#7A7A7A]">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1A3C34] border-r-transparent"></div>
              <p className="mt-2">Loading...</p>
            </div>
          )}

          {currentPage === 'menu' && !isLoading && (
            <div className="bg-white rounded-lg border border-[#E6E2D8] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('menuItems')}
                    className={`text-sm font-medium pb-2 border-b-2 transition ${
                      activeTab === 'menuItems'
                        ? 'text-[#1A3C34] border-[#1A3C34]'
                        : 'text-[#7A7A7A] border-transparent'
                    }`}
                  >
                    Menu Items
                  </button>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`text-sm font-medium pb-2 border-b-2 transition ${
                      activeTab === 'categories'
                        ? 'text-[#1A3C34] border-[#1A3C34]'
                        : 'text-[#7A7A7A] border-transparent'
                    }`}
                  >
                    Categories
                  </button>
                </div>

                {activeTab === 'menuItems' ? (
                  <Button
                    text="+ Add Item"
                    onClick={() => setIsAddModalOpen(true)}
                    width="w-auto"
                    height="h-[36px]"
                    className="px-6"
                  />
                ) : (
                  <Button
                    text="+ Add Category"
                    onClick={() => alert('Add Category modal - implement similar to Add Item')}
                    width="w-auto"
                    height="h-[36px]"
                    className="px-6"
                  />
                )}
              </div>

              {activeTab === 'menuItems' && (
                <div className="rounded-[12px] border border-[#E6E2D8] overflow-hidden">
                  {menuItems.length === 0 ? (
                    <div className="py-12 text-center text-[#7A7A7A]">
                      No menu items found. Click "+ Add Item" to create one.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E6E2D8] bg-[#F9FAFB]">
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Category</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Price</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuItems.map((item) => (
                          <tr key={item.id} className="border-b border-[#E6E2D8] hover:bg-[#F9F9F9] transition">
                            <td className="py-4 px-4 text-sm text-[#1A3C34]">{item.name}</td>
                            <td className="py-4 px-4 text-sm text-[#7A7A7A]">{item.category}</td>
                            <td className="py-4 px-4 text-sm text-[#1A3C34]">{item.price}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                item.availableForOrder 
                                  ? 'bg-[#D1FAE5] text-[#065F46]' 
                                  : 'bg-[#FEE2E2] text-[#DC2626]'
                              }`}>
                                {item.availableForOrder ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleEditClick(item)}
                                  className="p-1 hover:bg-[#E6E2D8] rounded transition" 
                                  title="Edit"
                                >
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#7A7A7A]">
                                    <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="p-1 hover:bg-[#FEE2E2] rounded transition" 
                                  title="Delete"
                                >
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#DC2626]">
                                    <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="rounded-[12px] border border-[#E6E2D8] overflow-hidden">
                  {categories.length === 0 ? (
                    <div className="py-12 text-center text-[#7A7A7A]">
                      No categories found. Click "+ Add Category" to create one.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E6E2D8] bg-[#F9FAFB]">
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Name</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-[#7A7A7A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.id} className="border-b border-[#E6E2D8] hover:bg-[#F9F9F9] transition">
                            <td className="py-4 px-4 text-sm text-[#1A3C34]">{category.name}</td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2 justify-end">
                                <button className="p-1 hover:bg-[#E6E2D8] rounded transition" title="Edit">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#7A7A7A]">
                                    <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="p-1 hover:bg-[#FEE2E2] rounded transition" 
                                  title="Delete"
                                >
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#DC2626]">
                                    <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}

          {currentPage === 'orders' && !isLoading && (
            <div className="bg-white rounded-lg border border-[#E6E2D8] overflow-hidden">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-[#7A7A7A]">
                  No orders found.
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E6E2D8] bg-[#F9FAFB]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#7A7A7A]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => (
                      <tr key={idx} className="border-b border-[#E6E2D8] hover:bg-[#F9F9F9] transition">
                        <td className="py-4 px-4 text-sm text-[#1A3C34]">#{order.id}</td>
                        <td className="py-4 px-4 text-sm text-[#7A7A7A]">{order.date}</td>
                        <td className="py-4 px-4 text-sm text-[#7A7A7A]">{order.customer}</td>
                        <td className="py-4 px-4 text-sm text-[#1A3C34]">{order.total}</td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as Order['status'])
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-full border cursor-pointer ${getStatusColor(order.status)}`}>
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready">Ready</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            text="Details"
                            onClick={() => alert('Order details - implement as needed')}
                            height=""
                            width="50px"
                            bgColor="#E6E2D8"
                            textColor="#1A1A1A"
                            className="px-4 py-1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <AddNewItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleItemSuccess}
      />

      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        onSuccess={handleItemSuccess}
        // item={selectedItem}
      />
    </div>
  );
}