const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: String,
    image: String,
    icon: String,
    position: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
