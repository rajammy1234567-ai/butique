const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  stock: {
    type: Number,
    default: 0
  }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    images: [
      {
        url: String,
        alt: String
      }
    ],
    variants: [variantSchema],
    tags: [
      {
        type: String,
        enum: ['trending', 'bestseller', 'new', 'sale', 'featured']
      }
    ],
    stock: {
      type: Number,
      default: 0
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'low_stock'],
      default: 'in_stock'
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: Date
      }
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    manufacturer: String,
    material: String,
    careInstructions: String,
    dimensions: {
      length: String,
      width: String,
      height: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
