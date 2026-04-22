import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import apiClient from '../../utils/axios';
import { uploadToCloudinary } from '../../utils/imageUpload';
import { compressImage, formatFileSize } from '../../utils/imageCompression';
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: [],
    tags: [],
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      const product = response.data.product;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category._id,
        stock: product.stock,
        images: product.images || [],
        tags: product.tags || [],
      });
      setVariants(product.variants || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        variants,
      };

      if (isEdit) {
        await apiClient.put(`/products/${id}`, payload);
        alert('Product updated successfully!');
      } else {
        await apiClient.post('/products', payload);
        alert('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (error) {
      alert('Error saving product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', size: '', stock: 0 }]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleTagToggle = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (let file of files) {
        console.log('Original file size:', formatFileSize(file.size));

        // Compress if too large
        let fileToUpload = file;
        if (file.size > 5 * 1024 * 1024) {
          console.log('File is large, compressing...');
          fileToUpload = await compressImage(file, 600, 600, 0.75);
          console.log('Compressed file size:', formatFileSize(fileToUpload.size));
        }

        const imageUrl = await uploadToCloudinary(fileToUpload);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { url: imageUrl, alt: file.name }]
        }));
      }
      alert('Images uploaded successfully! ✅');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading images:\n' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <AdminLayout>
      <div>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Products
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {isEdit ? '✏️ Edit Product' : '➕ Add New Product'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-4xl">
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                required
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📸 Product Images</h2>
            
            {/* Upload Button */}
            <div className="mb-4">
              <label className="block">
                <div className="border-2 border-dashed border-primary-600 rounded-lg p-6 text-center cursor-pointer hover:bg-primary-50 transition">
                  <Upload className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-primary-600 font-semibold">Click to upload images</p>
                  <p className="text-gray-500 text-sm">or drag and drop</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
              </label>
            </div>

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url || image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploading && <p className="text-primary-600 mt-2">⏳ Uploading images...</p>}
          </div>

          {/* Pricing & Stock */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Pricing & Stock</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏷️ Tags</h2>
            <div className="flex flex-wrap gap-3">
              {['trending', 'bestseller', 'new', 'sale', 'featured'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    formData.tags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)} {formData.tags.includes(tag) && '✓'}
                </button>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">👕 Variants</h2>
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                <Plus className="w-5 h-5" /> Add Variant
              </button>
            </div>

            {variants.map((variant, index) => (
              <div key={index} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
