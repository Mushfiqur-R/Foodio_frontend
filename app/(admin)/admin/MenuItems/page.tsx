'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getAuthConfig } from '@/app/utils/auth';
import Button from '@/components/Button';
import AddNewItemModal from '@/components/AddNewItemModel';
import EditItemModal from '@/components/EditItemModel';
import AddCategoryModal from '@/components/AddCategoryModal';
import OrderDetailsModal from '@/components/OrderDetailsModel';

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

export default function MenuItemsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'menuItems' | 'categories'>('menuItems');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
     const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // States
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      setError('');

      const config = getAuthConfig();
      const response = await axios.get('http://localhost:3000/admin/menu', config);

      const transformedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'N/A',
        categoryId: item.categoryId,
        price: `${item.price}`,
        rawPrice: item.price,
        description: item.description || '',
        image: item.imageUrl || undefined,
        status: item.isAvailable ? 'Available' : 'Unavailable',
        availableForOrder: item.isAvailable,
      }));

      setMenuItems(transformedData);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => router.push('/auth'), 1500);
      } else {
        setError('Failed to load menu items');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError('');

      const config = getAuthConfig();
      const response = await axios.get('http://localhost:3000/admin/categories', config);

      setCategories(response.data);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => router.push('/auth'), 1500);
      } else {
        setError('Failed to load categories');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === 'menuItems') {
      fetchMenuItems();
    } else {
      fetchCategories();
    }
  }, [activeTab]);

  // Delete menu item
  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const config = getAuthConfig();
      await axios.delete(`http://localhost:3000/admin/menuitem/${itemId}`, config);
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      alert(error.response?.status === 401 ? 'Authentication failed' : 'Failed to delete item');
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
      alert(error.response?.status === 401 ? 'Authentication failed' : 'Failed to delete category');
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-[32px] font-semibold text-[#1A3C34] mb-8">Menu Items</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-4 text-center text-[#7A7A7A]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1A3C34] border-r-transparent"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <div className="bg-white rounded-lg border border-[#E6E2D8] p-6">
          {/* Tab Navigation */}
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
                 onClick={() => setIsAddCategoryModalOpen(true)}
                width="w-auto"
                height="h-[36px]"
                className="px-6"
              />
            )}
          </div>

          {/* Menu Items Table */}
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
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              item.availableForOrder
                                ? 'bg-[#D1FAE5] text-[#065F46]'
                                : 'bg-[#FEE2E2] text-[#DC2626]'
                            }`}
                          >
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
                                <path
                                  d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 hover:bg-[#FEE2E2] rounded transition"
                              title="Delete"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#DC2626]">
                                <path
                                  d="M2 4H3.33333H14"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
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

          {/* Categories Table */}
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
                                <path
                                  d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 hover:bg-[#FEE2E2] rounded transition"
                              title="Delete"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#DC2626]">
                                <path
                                  d="M2 4H3.33333H14"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
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

      {/* Modals */}
      <AddNewItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchMenuItems();
          setIsAddModalOpen(false);
        }}
      />

      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        onSuccess={() => {
          fetchMenuItems();
          setIsEditModalOpen(false);
        }}
        item={selectedItem}
      />
       <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSuccess={() => {
          fetchCategories();
          setIsAddCategoryModalOpen(false);
        }}

      />

      
    </div>
  );
}