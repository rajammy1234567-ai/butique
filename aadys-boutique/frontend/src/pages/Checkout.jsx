import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/axios';
import { formatPrice } from '../utils/helpers';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Address Form
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?._id || '');
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phone || '',
    isDefault: false
  });

  const handleAddAddress = async () => {
    if (!newAddress.street || !newAddress.city) {
      setMessage('❌ Please fill all fields');
      return;
    }

    try {
      const response = await apiClient.post('/auth/address', newAddress);
      setAddresses(response.data.user.addresses);
      setSelectedAddress(response.data.user.addresses[response.data.user.addresses.length - 1]._id);
      setNewAddress({street: '', city: '', state: '', zipCode: '', phone: user?.phone || '', isDefault: false});
      setMessage('✅ Address added successfully');
    } catch (error) {
      setMessage('❌ Failed to add address');
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedAddress && !newAddress.street) {
      setMessage('❌ Please select or add an address');
      return;
    }

    setLoading(true);
    try {
      const shippingAddress = selectedAddress
        ? addresses.find(a => a._id === selectedAddress)
        : newAddress;

      const finalAmount = Math.round(getTotalPrice() * 1.18);
      
      const response = await apiClient.post('/orders', {
        items: cart,
        totalAmount: finalAmount,
        shippingAddress: {
          name: user?.name,
          email: user?.email,
          phone: shippingAddress.phone,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode
        }
      });

      // Open Razorpay
      const options = {
        key: response.data.razorpayKeyId,
        amount: finalAmount * 100,
        currency: 'INR',
        order_id: response.data.razorpayOrderId,
        name: 'Aadyasbyanita',
        description: 'Order Payment',
        image: '/logo.png',
        handler: async (res) => {
          try {
            await apiClient.post('/orders/verify-payment', {
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature,
              orderId: response.data.order.orderId
            });

            setMessage('✅ Payment successful! Order placed.');
            clearCart();
            setTimeout(() => navigate('/orders'), 2000);
          } catch (error) {
            setMessage('❌ Payment verification failed');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone
        },
        modal: {
          ondismiss: async function() {
            try {
              if (response?.data?.order?._id) {
                await apiClient.put(`/orders/${response.data.order._id}/cancel`, {
                  reason: 'Customer closed payment window without paying'
                });
              }
              setMessage('⚠️ You closed the payment window. Order cancelled.');
            } catch (err) {
              console.error('Failed to cancel incomplete order', err);
            }
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Failed to create order'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-serif mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">1. Shipping Address</h2>

              {/* Existing Addresses */}
              {addresses.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3">Select existing address:</p>
                  <div className="space-y-2">
                    {addresses.map(addr => (
                      <label key={addr._id} className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="address"
                          value={addr._id}
                          checked={selectedAddress === addr._id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mt-1"
                        />
                        <div className="text-sm">
                          <p className="font-semibold">{addr.street}</p>
                          <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                          <p className="text-gray-600">Phone: {addr.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Address */}
              <div className="border-t pt-6">
                <p className="text-sm font-semibold mb-4">Add new address:</p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street address"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                  </div>
                  <button
                    onClick={handleAddAddress}
                    className="w-full border border-primary-600 text-primary-600 py-2 rounded hover:bg-primary-50"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">2. Order Summary</h2>
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-3">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-lg font-semibold ${
                message.includes('✅')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Total</h2>
              
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span className="text-primary-600">{formatPrice(getTotalPrice() * 1.18)}</span>
              </div>

              <button
                onClick={handleCreateOrder}
                disabled={loading || cart.length === 0}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 font-semibold"
              >
                 {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <Footer />
    </>
  );
}
