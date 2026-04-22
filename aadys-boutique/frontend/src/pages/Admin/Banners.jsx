import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import apiClient from '../../utils/axios';
import { uploadToCloudinary } from '../../utils/imageUpload';
import { compressImage, formatFileSize } from '../../utils/imageCompression';
import {
  Plus, Trash2, Eye, EyeOff, Upload,
  Monitor, Tag, Flame, Leaf, Edit2, X, Check, Grid, Instagram
} from 'lucide-react';

/* ─── Banner type definitions ─── */
const BANNER_TYPES = [
  {
    value: 'hero',
    label: 'Hero Slider',
    icon: <Monitor className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
    desc: 'Main full-screen slider at the TOP of homepage. Upload multiple for a slideshow.',
    section: '📍 Appears: Top of page — Hero Slider section',
  },
  {
    value: 'promotion',
    label: 'Promo Banner',
    icon: <Tag className="w-4 h-4" />,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-700',
    desc: 'Wide promotional banner shown BELOW Trending products section.',
    section: '📍 Appears: Below Trending Now section',
  },
  {
    value: 'sale',
    label: 'Sale Banner',
    icon: <Flame className="w-4 h-4" />,
    color: 'bg-red-100 text-red-700 border-red-200',
    badgeColor: 'bg-red-100 text-red-700',
    desc: 'Sale/discount banner shown BELOW the Promo Banner section.',
    section: '📍 Appears: Below Promo Banner section',
  },
  {
    value: 'seasonal',
    label: 'Seasonal',
    icon: <Leaf className="w-4 h-4" />,
    color: 'bg-green-100 text-green-700 border-green-200',
    badgeColor: 'bg-green-100 text-green-700',
    desc: 'Seasonal offer banner shown ABOVE the Categories section.',
    section: '📍 Appears: Above Shop Categories section',
  },
  {
    value: 'collection',
    label: 'Collection Image/Video',
    icon: <Grid className="w-4 h-4" />,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-700',
    desc: 'Image or Video shown in the "Our Collections" grid on the homepage.',
    section: '📍 Appears: Our Collections grid',
  },
  {
    value: 'instagram',
    label: 'Instagram Feed Image/Video',
    icon: <Instagram className="w-4 h-4" />,
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    badgeColor: 'bg-pink-100 text-pink-700',
    desc: 'Image or Video shown in the @aadyasbyanita Instagram feed section.',
    section: '📍 Appears: Bottom Instagram Feed section',
  },
];

const typeInfo = (type) => BANNER_TYPES.find(t => t.value === type) || BANNER_TYPES[0];

/* ─── Edit-in-place row ─── */
function BannerCard({ banner, onToggle, onDelete, onUpdateType }) {
  const [editingType, setEditingType] = useState(false);
  const ti = typeInfo(banner.bannerType || 'hero');

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden flex gap-0 ${
        banner.isActive ? 'border-green-200' : 'border-gray-200 opacity-70'
      }`}
    >
      {/* Thumbnail */}
      <div className="w-40 h-28 flex-shrink-0 bg-gray-100">
        {banner.image?.match(/\.(mp4|webm|mov)$/i) ? (
          <video src={banner.image} className="w-full h-full object-cover" muted loop autoPlay playsInline />
        ) : (
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=Banner'; }}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          {/* Type badge + inline editor */}
          {editingType ? (
            <div className="flex flex-wrap gap-2 mb-2">
              {BANNER_TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => { onUpdateType(banner._id, t.value); setEditingType(false); }}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-semibold transition ${
                    banner.bannerType === t.value
                      ? `${t.color} ring-2 ring-offset-1 ring-current`
                      : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
              <button onClick={() => setEditingType(false)}
                className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${ti.badgeColor}`}>
                {ti.icon} {ti.label}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {banner.isActive ? '● Active' : '○ Inactive'}
              </span>
              <button
                onClick={() => setEditingType(true)}
                title="Move to a different section"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition ml-1"
              >
                <Edit2 className="w-3 h-3" /> change section
              </button>
            </div>
          )}

          <h3 className="font-bold text-gray-800 text-base truncate">{banner.title}</h3>
          {banner.description && (
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{banner.description}</p>
          )}
          <p className="text-[10px] text-gray-400 mt-1">{ti.section}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => onToggle(banner._id)}
            className={`flex items-center gap-1 text-xs font-semibold transition ${
              banner.isActive
                ? 'text-orange-500 hover:text-orange-600'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            {banner.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {banner.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={() => onDelete(banner._id)}
            className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function AdminBanners() {
  const [banners, setBanners]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [toast, setToast]         = useState('');

  const [formData, setFormData] = useState({
    title: '', description: '', image: '',
    isActive: true, bannerType: 'hero',
    cta_text: '', cta_link: '',
  });

  useEffect(() => { fetchBanners(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const r = await apiClient.get('/banners');
      if (r.data.success) setBanners(r.data.banners || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Please enter a title');
    if (!formData.image) return alert('Please upload an image');
    try {
      const r = await apiClient.post('/banners', formData);
      if (r.data.success) {
        setFormData({ title:'', description:'', image:'', isActive:true, bannerType:'hero', cta_text:'', cta_link:'' });
        setShowForm(false);
        fetchBanners();
        showToast('✅ Banner created!');
      }
    } catch (e) { alert('Error: ' + (e.response?.data?.message || e.message)); }
  };

  const toggleActive = async (id) => {
    try {
      await apiClient.patch(`/banners/${id}/toggle`);
      fetchBanners();
      showToast('✅ Banner status updated!');
    } catch (e) { alert('Error toggling banner'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner permanently?')) return;
    try {
      await apiClient.delete(`/banners/${id}`);
      fetchBanners();
      showToast('🗑️ Banner deleted');
    } catch (e) { alert('Error deleting banner'); }
  };

  /* Change section (type) of existing banner WITHOUT re-uploading */
  const handleUpdateType = async (id, newType) => {
    try {
      await apiClient.put(`/banners/${id}`, { bannerType: newType });
      fetchBanners();
      showToast(`✅ Moved to "${typeInfo(newType).label}"`);
    } catch (e) { alert('Error updating banner type'); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      let f = file;
      // Only compress if it's an image and larger than 5MB
      if (file.type.startsWith('image/') && file.size > 5 * 1024 * 1024) {
        f = await compressImage(file, 1920, 600, 0.75);
      }
      const url = await uploadToCloudinary(f);
      setFormData(prev => ({ ...prev, image: url }));
      showToast(file.type.startsWith('video/') ? '✅ Video uploaded!' : '✅ Image uploaded!');
    } catch (e) { alert('Upload error: ' + e.message); }
    finally { setUploading(false); }
  };

  /* Group by type */
  const grouped = {};
  BANNER_TYPES.forEach(t => { grouped[t.value] = banners.filter(b => (b.bannerType || 'hero') === t.value); });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold animate-fade-in">
          {toast}
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🖼️ Banners</h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload once — assign to any section. Use the <strong>"change section"</strong> button to move banners between sections without re-uploading.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
          >
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>

        {/* Section Map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {BANNER_TYPES.map(t => (
            <div key={t.value} className={`rounded-xl border p-3 ${t.color}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {t.icon} {t.label}
              </div>
              <p className="text-xs opacity-75">{t.desc}</p>
              <p className="text-[11px] font-semibold mt-1.5 opacity-90">{t.section}</p>
            </div>
          ))}
        </div>

        {/* ── Add Form ── */}
        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7 mb-8">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-800">New Banner</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner type selector */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📍 Which section? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {BANNER_TYPES.map(t => (
                  <label
                    key={t.value}
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.bannerType === t.value
                        ? `border-primary-600 bg-primary-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bannerType"
                      value={t.value}
                      checked={formData.bannerType === t.value}
                      onChange={e => setFormData({ ...formData, bannerType: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-800 flex items-center gap-1">{t.icon}{t.label}</p>
                      <p className="text-xs text-gray-500">{t.section}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input type="text" required placeholder="e.g. New Silk Collection"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle / Description</label>
                <input type="text" placeholder="e.g. Crafted with heritage. Worn with grace."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Button Text</label>
                <input type="text" placeholder="e.g. Shop Now, Explore Collection"
                  value={formData.cta_text}
                  onChange={e => setFormData({...formData, cta_text: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Button Link</label>
                <input type="text" placeholder="e.g. /products or /products?category=..."
                  value={formData.cta_link}
                  onChange={e => setFormData({...formData, cta_link: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Banner Image *
                <span className="text-xs font-normal text-gray-400 ml-2">
                  {formData.bannerType === 'hero' ? '(Best: 1920×900px)' : '(Best: 1600×500px wide)'}
                </span>
              </label>
              <div className="flex gap-4 items-start">
                <label className="flex-1 cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-5 text-center hover:bg-primary-50 transition ${uploading ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-primary-400'}`}>
                    <Upload className="w-7 h-7 text-primary-600 mx-auto mb-1" />
                    <p className="text-primary-700 font-semibold text-sm">{uploading ? 'Uploading…' : 'Click to upload'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Images or Videos (MP4) up to 10 MB</p>
                    <input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                  </div>
                </label>
                {formData.image && (
                  <div className="relative">
                    {formData.image.match(/\.(mp4|webm|mov)$/i) ? (
                      <video src={formData.image} className="w-36 h-24 object-cover rounded-lg shadow" muted loop autoPlay playsInline />
                    ) : (
                      <img src={formData.image} alt="Preview" className="w-36 h-24 object-cover rounded-lg shadow" />
                    )}
                    <button type="button" onClick={() => setFormData({...formData, image:''})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-green-600 mt-1 text-center font-semibold">✅ Ready</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <input type="checkbox" id="isActive" checked={formData.isActive}
                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4 accent-primary-600" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible on homepage immediately)</label>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={uploading || !formData.image}
                className="bg-primary-600 text-white px-7 py-2.5 rounded-lg hover:bg-primary-700 disabled:opacity-50 font-semibold text-sm transition">
                Create Banner
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 text-sm transition">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ── Banners grouped by section ── */}
        {BANNER_TYPES.map(t => (
          <div key={t.value} className="mb-8">
            <div className={`flex items-center gap-2 mb-3 px-4 py-2 rounded-lg border ${t.color} w-fit`}>
              {t.icon}
              <span className="font-bold text-sm">{t.label}</span>
              <span className="text-xs opacity-70">({grouped[t.value]?.length || 0})</span>
              {t.value === 'hero' && grouped[t.value]?.length > 1 && (
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-1">Slideshow ✓</span>
              )}
              {t.value !== 'hero' && grouped[t.value]?.length > 1 && (
                <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full ml-1">Only 1st shown</span>
              )}
            </div>

            {grouped[t.value]?.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {grouped[t.value].map(b => (
                  <BannerCard
                    key={b._id}
                    banner={b}
                    onToggle={toggleActive}
                    onDelete={handleDelete}
                    onUpdateType={handleUpdateType}
                  />
                ))}
              </div>
            ) : (
              <div className={`rounded-xl border-2 border-dashed p-5 text-center ${t.color} opacity-60`}>
                <p className="text-sm">No {t.label} banners yet.
                  <button onClick={() => { setFormData(f => ({...f, bannerType: t.value})); setShowForm(true); }}
                    className="underline ml-1 font-semibold">Add one</button>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
