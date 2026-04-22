import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Truck, Shield } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setMessage('Please login to add items to cart');
      return;
    }

    addToCart(product, quantity, {
      size: selectedSize,
      color: selectedColor
    });
    setMessage('✅ Added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">Loading...</div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">Product not found</div>
        <Footer />
      </>
    );
  }

  const uniqueSizes = [...new Set(product.variants?.map(v => v.size) || [])];
  const uniqueColors = [...new Set(product.variants?.map(v => v.color) || [])];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images?.[0]?.url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`View ${idx + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-70"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-4">
              <span className="text-primary-600 text-sm font-semibold uppercase">
                {product.category?.name}
              </span>
              <h1 className="text-3xl font-bold font-serif text-gray-900 mt-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm text-gray-500">(142 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-primary-600 text-3xl font-bold">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 mt-2">
                {product.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Variants */}
            {uniqueSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {uniqueSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border transition ${
                        selectedSize === size
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-300 text-gray-700 hover:border-primary-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {uniqueColors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {uniqueColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded border transition ${
                        selectedColor === color
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-300 text-gray-700 hover:border-primary-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Action */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isAuthenticated || product.stock === 0}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {message && (
              <p className={`text-center py-2 rounded ${
                message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {message}
              </p>
            )}

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex gap-3">
                <Truck className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-gray-600 text-xs">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-gray-600 text-xs">100% safe transactions</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Care Instructions</h3>
              <p className="text-sm text-gray-700">{product.careInstructions || 'Hand wash recommended'}</p>
              {product.material && (
                <p className="text-sm text-gray-700 mt-2"><strong>Material:</strong> {product.material}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
