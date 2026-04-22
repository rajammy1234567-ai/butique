import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice, getStatusColor } from '../utils/helpers';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders');
      const completedOrders = response.data.orders.filter(order => order.paymentStatus !== 'pending');
      setOrders(completedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-serif mb-8">My Orders</h1>

        {loading ? (
          <div className="text-center py-20">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-semibold text-primary-600">{formatPrice(order.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-3">Delivery Status</p>
                  <div className="flex items-center gap-2 text-sm">
                    {['placed', 'confirmed', 'shipped', 'delivered'].map((status, idx) => (
                      <div key={status} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          ['placed', 'confirmed', 'shipped', 'delivered'].indexOf(status) <= ['placed', 'confirmed', 'shipped', 'delivered'].indexOf(order.orderStatus)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          ✓
                        </div>
                        {idx < 3 && <div className="w-8 h-1 bg-gray-300 mx-1" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items Preview */}
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Items ({order.items.length})</p>
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {item.quantity}x {item.productName} - {formatPrice(item.price)}
                      </p>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-gray-600">+{order.items.length - 2} more items</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                >
                  {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                </button>

                {/* Detailed View */}
                {selectedOrder?._id === order._id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3">Delivery Address</h4>
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress.name}<br/>
                      {order.shippingAddress.street}<br/>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br/>
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
