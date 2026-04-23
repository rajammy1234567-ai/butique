import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    address: '',
    addressType: 'home'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('✅ Profile updated successfully!');
    } catch (error) {
      setMessage(`❌ ${error.message || 'Failed to update profile'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/address`,
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(response.data.addresses);
      setNewAddress({
        fullName: '',
        phone: '',
        state: '',
        city: '',
        postalCode: '',
        address: '',
        addressType: 'home'
      });
      setShowAddForm(false);
      setMessage('✅ Address added successfully!');
    } catch (error) {
      setMessage(`❌ ${error.message || 'Failed to add address'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (index) => {
    if (window.confirm('Delete this address?')) {
      try {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
        setMessage('✅ Address deleted!');
      } catch (error) {
        setMessage('❌ Failed to delete address');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-serif mb-8 text-gray-800">My Account</h1>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('❌') 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600"><strong>Status:</strong> {user?.isAdmin ? '👑 Admin' : '👤 Customer'}</p>
                  <p className="text-xs text-gray-500 mt-2">Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>

            {/* Addresses Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
              
              {addresses && addresses.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{addr.fullName}</p>
                          <p className="text-sm text-gray-600">{addr.address}</p>
                          <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.postalCode}</p>
                          <p className="text-sm text-gray-600">📱 {addr.phone}</p>
                          <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full capitalize">
                            {addr.addressType}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(idx)}
                          className="text-red-600 hover:text-red-700 ml-4"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-6">No addresses saved yet.</p>
              )}

              {showAddForm ? (
                <form onSubmit={handleAddAddress} className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Add New Address</h3>
                  
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={newAddress.fullName}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    required
                  />

                  <textarea
                    name="address"
                    placeholder="Full Address"
                    value={newAddress.address}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    rows="2"
                    required
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    required
                  />

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    required
                  />

                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                    required
                  />

                  <select
                    name="addressType"
                    value={newAddress.addressType}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 text-sm"
                    >
                      {loading ? 'Saving...' : 'Save Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-700 py-3 rounded-lg hover:border-primary-600 hover:text-primary-600 transition font-semibold"
                >
                  <Plus size={20} /> Add New Address
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
