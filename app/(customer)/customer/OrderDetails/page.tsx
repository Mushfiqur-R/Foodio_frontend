'use client';

import { useState, useEffect } from 'react';
import OrderPlaceCart from '@/components/OrderPlaceCartl'; 

type Order = {
  orderId: string;
  placedDate: string;
  placedTime: string;
  items: Array<{
    quantity: number;
    name: string;
    price: number;
  }>;
  deliveryAddress: string;
  totalAmount: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED';
};

export default function MyOrders() {
  // Sample orders data - replace with your actual data fetching logic
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: '5b331ea1',
      placedDate: 'December 12th, 2025',
      placedTime: '4:33 PM',
      items: [
        { quantity: 1, name: 'Golden Crunch Bites', price: 24.0 }
      ],
      deliveryAddress: 'House-23, Road-23, Jamaica, USA',
      totalAmount: 24.0,
      status: 'PENDING'
    },
    {
      orderId: '5b331ea2',
      placedDate: 'December 12th, 2025',
      placedTime: '4:33 PM',
      items: [
        { quantity: 1, name: 'Mediterranean Olive Medley', price: 24.0 }
      ],
      deliveryAddress: 'House-23, Road-23, Jamaica, USA',
      totalAmount: 24.0,
      status: 'COMPLETED'
    },
    {
      orderId: '5b331ea3',
      placedDate: 'December 10th, 2025',
      placedTime: '2:15 PM',
      items: [
        { quantity: 2, name: 'Spicy Chicken Wings', price: 15.5 },
        { quantity: 1, name: 'Caesar Salad', price: 12.0 }
      ],
      deliveryAddress: 'House-23, Road-23, Jamaica, USA',
      totalAmount: 43.0,
      status: 'READY'
    }
  ]);

  // Optional: Filter functionality
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-2">
            My Orders
          </h1>
          <p className="text-[16px] text-[#666666]">
            Track and manage your orders
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {['ALL', 'PENDING', 'PREPARING', 'READY', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                filterStatus === status
                  ? 'bg-[#1A3C34] text-white'
                  : 'bg-[#F8F8F8] text-[#666666] hover:bg-[#E8E8E8]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderPlaceCart
                key={order.orderId}
                orderId={order.orderId}
                placedDate={order.placedDate}
                placedTime={order.placedTime}
                items={order.items}
                deliveryAddress={order.deliveryAddress}
                totalAmount={order.totalAmount}
                status={order.status}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[18px] text-[#666666]">
                No orders found with status: {filterStatus}
              </p>
            </div>
          )}
        </div>

        {/* Empty State (when no orders at all) */}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-2">
              No orders yet
            </h3>
            <p className="text-[16px] text-[#666666] mb-6">
              Start ordering to see your order history here
            </p>
            <button className="px-6 py-3 bg-[#1A3C34] text-white rounded-lg hover:bg-[#2A4C44] transition-colors">
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}