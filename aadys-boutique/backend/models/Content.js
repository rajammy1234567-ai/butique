const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['image', 'video', 'post'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    thumbnail: String,
    platform: {
      type: String,
      enum: ['instagram', 'youtube', 'tiktok', 'other'],
      default: 'instagram'
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    position: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    section: {
      type: String,
      enum: ['social', 'gallery', 'reviews', 'testimonials'],
      default: 'social'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
