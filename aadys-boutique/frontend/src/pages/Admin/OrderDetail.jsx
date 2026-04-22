import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import apiClient from '../../utils/axios';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      setOrder(response.data.order);
      setNewStatus(response.data.order.orderStatus);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === order.orderStatus) {
      alert('No changes to save');
      return;
    }

    setUpdating(true);
    try {
      await apiClient.put(`/admin/orders/${id}/status`, { status: newStatus });
      alert('Order status updated!');
      fetchOrder();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-center text-gray-500">Loading order...</p>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <p className="text-center text-red-500">Order not found</p>
      </AdminLayout>
    );
  }

  const statusTimeline = [
    { status: 'Placed', icon: '📋' },
    { status: 'Confirmed', icon: '✅' },
    { status: 'Shipped', icon: '🚚' },
    { status: 'Delivered', icon: '🎉' },
  ];

  const currentStatusIndex = statusTimeline.findIndex(s => s.status === order.orderStatus);

  return (
    <AdminLayout>
      <div>
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Orders
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Order #{order._id?.slice(-6).toUpperCase()}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{order.user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{order.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{order.user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Shipping Address</h2>
              <p className="text-gray-900">{order.shippingAddress?.address}</p>
              <p className="text-gray-900">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-4 border-b last:border-b-0">
                    <img
                      src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/80'}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.product?.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Variant: {item.variant?.size}, {item.variant?.color}</p>
                    </div>
                    <p className="font-semibold text-gray-900">₹{item.price?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Order Timeline</h2>
              <div className="flex">
                {statusTimeline.map((item, idx) => (
                  <div
                    key={item.status}
                    className={`flex-1 flex flex-col items-center ${idx < statusTimeline.length - 1 ? 'relative' : ''}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        idx <= currentStatusIndex
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <p className={`text-sm font-semibold mt-2 ${idx <= currentStatusIndex ? 'text-primary-600' : 'text-gray-600'}`}>
                      {item.status}
                    </p>
                    {idx < statusTimeline.length - 1 && (
                      <div
                        className={`absolute top-6 left-1/2 w-full h-1 ${
                          idx < currentStatusIndex ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💳 Payment</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{(order.totalAmount - (order.shipping || 0))?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹{(order.shipping || 0)?.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary-600">₹{order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                <span
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                    order.paymentStatus === 'Success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Order Status Update */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">✏️ Update Status</h2>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="Placed">Placed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === order.orderStatus}
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 font-semibold"
              >
                {updating ? 'Updating...' : 'Update Status'}
              </button>
            </div>

            {/* Razorpay Info */}
            {order.razorpayPaymentId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🔐 Payment ID</h2>
                <p className="text-sm text-gray-600 break-all font-mono">{order.razorpayPaymentId}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
