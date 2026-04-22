import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function AdminContent() {
  const [content, setContent] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: 'image', title: '', url: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setContent([...content, { id: Date.now(), ...formData, uploadDate: new Date() }]);
    setFormData({ type: 'image', title: '', url: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this content?')) {
      setContent(content.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🎥 Content Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" /> Add Content
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>

              <input
                type="text"
                placeholder="Title (optional)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <input
              type="url"
              placeholder="Image/Video URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-600"
              required
            />

            <div className="flex gap-3">
              <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
                Add Content
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.length > 0 ? (
            content.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title} className="w-full h-40 object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-40 bg-black" />
                )}
                <div className="p-4">
                  <p className="font-semibold text-gray-800 mb-2">{item.title || 'Untitled'}</p>
                  <p className="text-xs text-gray-600 mb-4">
                    {item.type === 'image' ? '🖼️ Image' : '🎥 Video'} • {item.uploadDate.toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-full text-red-600 hover:text-red-700 font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3 py-8">No content uploaded yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
