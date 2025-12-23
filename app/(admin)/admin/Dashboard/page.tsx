"use client"
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useState } from "react";


type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  status: string;
};


type Category = {
  id: number;
  name: string;
};

type Order = {
  id: string;
  date: string;
  customer: string;
  total: string;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed';
};


export default function FoodioManagement() {
  const [currentPage, setCurrentPage] = useState<'menu' | 'orders'>('menu');
  const [activeTab, setActiveTab] = useState<'menuItems' | 'categories'>('menuItems');
  
  const [menuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Pan-Seared Scallops', category: 'Starters', price: '$24.00', status: 'Available' },
    { id: 2, name: 'Mediterranean Olive Medley', category: 'Starters', price: '$18.00', status: 'Available' },
    { id: 3, name: 'Citrus Swirl Delights', category: 'Main Courses', price: '$32.00', status: 'Available' },
    { id: 4, name: 'Creamy Garlic Shrimp Pasta', category: 'Main Courses', price: '$45.00', status: 'Available' },
    { id: 5, name: 'Herb-Roasted Chicken Bowl', category: 'Desserts', price: '$16.00', status: 'Available' },
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Main Courses' },
    { id: 3, name: 'Desserts' },
  ]);

const [orders, setOrders] = useState<Order[]>([
  { id: '5b33ea1...', date: 'Dec 12, 4:33 PM', customer: 'John Doe', total: '$24.00', status: 'Pending' },
  { id: '5b33ea2...', date: 'Dec 12, 4:33 PM', customer: 'John Doe', total: '$56.00', status: 'Preparing' },
]);
   

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
  orderId: string,
  newStatus: Order['status']
) => {
  try {
    // 🔥 PATCH request
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    // ✅ UI update
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  } catch (error) {
    alert('Status update failed');
  }
};

  return (
    <div className="flex h-screen bg-[#F5F5F0]">
      {/* Sidebar */}
      <div className="w-[170px] bg-[#F5F5F0] border-r border-[#E6E2D8] flex flex-col">
        <div className="p-6">
          <Logo />
        </div>

        {/* Navigation */}
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

        {/* Sign Out */}
        <button className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition">
          <span className="text-base">↩</span>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-[32px] font-semibold text-[#1A3C34] mb-8">
            {currentPage === 'menu' ? 'Menu Items' : 'Order Management'}
          </h1>

          {/* Menu Items Content */}
          {currentPage === 'menu' && (
            <div className="bg-white rounded-lg border border-[#E6E2D8] p-6">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between mb-6 ">
                <div className="flex gap-6 ">
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
                    className={`text-sm font-medium pb-2 border-b-2  transition ${
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
                    onClick={() => alert('Add Item clicked')}
                    width="w-auto"
                    height="h-[36px]"
                    className="px-6"
                  />
                ) : (
                  <Button
                    text="+ Add Category"
                    onClick={() => alert('Add Category clicked')}
                    width="w-auto"
                    height="h-[36px]"
                    className="px-6"
                  />
                )}
              </div>

              {/* Menu Items Table */}
              {activeTab === 'menuItems' && (
                <div className="rounded-[12px] border border-[#E6E2D8] overflow-hidden">
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
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#D1FAE5] text-[#065F46] rounded-full">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-[#E6E2D8] rounded transition" title="Edit">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#7A7A7A]">
                                  <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                              <button className="p-1 hover:bg-[#FEE2E2] rounded transition" title="Delete">
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
                </div>
              )}

              {/* Categories Table */}
              {activeTab === 'categories' && (
                <div className="rounded-[12px] border border-[#E6E2D8] overflow-hidden">
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
                              <button className="p-1 hover:bg-[#FEE2E2] rounded transition" title="Delete">
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
                </div>
              )}
            </div>
          )}

          {/* Orders Content */}
          {currentPage === 'orders' && (
            <div className="bg-white rounded-lg border border-[#E6E2D8] overflow-hidden">
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
                      <td className="py-4 px-4 text-sm text-[#1A3C34]">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-[#7A7A7A]">{order.date}</td>
                      <td className="py-4 px-4 text-sm text-[#7A7A7A]">{order.customer}</td>
                      <td className="py-4 px-4 text-sm text-[#1A3C34]">{order.total}</td>
                      <td className="py-4 px-4">
                        {/* <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span> */}
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
                        {/* <button className="text-sm text-[#1A3C34] hover:underline">
                          Details
                        </button> */}
                        <Button
                          text="Details"
                          onClick={() => alert('Add Category clicked')}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}