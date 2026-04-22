const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const Banner = require('../models/Banner');

// Seed demo data
router.post('/seed-data', async (req, res) => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Banner.deleteMany({});

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Dresses', slug: 'dresses', description: 'Beautiful dresses for every occasion' },
      { name: 'Tops', slug: 'tops', description: 'Stylish tops and blouses' },
      { name: 'Bottoms', slug: 'bottoms', description: 'Trendy bottoms and pants' },
      { name: 'Accessories', slug: 'accessories', description: 'Jewelry and accessories' },
    ]);

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Elegant Black Evening Dress',
        description: 'A stunning black evening dress perfect for special occasions. Made with premium fabric and elegant design.',
        price: 4999,
        category: categories[0]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1595777707802-69b1d7deae75?w=500&h=500&fit=crop', alt: 'Black Evening Dress' }],
        stock: 15,
        variants: [{ color: 'Black', size: 'S' }, { color: 'Black', size: 'M' }, { color: 'Black', size: 'L' }, { color: 'Black', size: 'XL' }],
        tags: ['featured'],
      },
      {
        name: 'Colorful Summer Dress',
        description: 'Light and comfortable summer dress with vibrant colors. Perfect for beach or casual outings.',
        price: 2499,
        category: categories[0]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1595866333195-8a0dcb56b351?w=500&h=500&fit=crop', alt: 'Summer Dress' }],
        stock: 25,
        variants: [
          { color: 'Floral Multicolor', size: 'XS' },
          { color: 'Floral Multicolor', size: 'S' },
          { color: 'Floral Multicolor', size: 'M' },
        ],
        tags: ['new'],
      },
      {
        name: 'Classic White Shirt',
        description: 'A versatile classic white shirt that goes with everything. Perfect for work or casual wear.',
        price: 1899,
        category: categories[1]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1596215551635-5a82f3c9ca61?w=500&h=500&fit=crop', alt: 'White Shirt' }],
        stock: 30,
        variants: [
          { color: 'White', size: 'XS' },
          { color: 'White', size: 'S' },
          { color: 'White', size: 'M' },
          { color: 'White', size: 'L' },
        ],
        tags: ['bestseller'],
      },
      {
        name: 'Flowy Blue Top',
        description: 'A beautiful flowing blue top perfect for warm weather. Comfortable and stylish.',
        price: 1599,
        category: categories[1]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1551931086-d5d88ba8e4a4?w=500&h=500&fit=crop', alt: 'Blue Top' }],
        stock: 20,
        variants: [{ color: 'Blue', size: 'S' }, { color: 'Blue', size: 'M' }, { color: 'Blue', size: 'L' }],
        tags: ['trending'],
      },
      {
        name: 'Denim Jeans',
        description: 'Classic denim jeans with a perfect fit. Comfortable for everyday wear.',
        price: 2299,
        category: categories[2]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop', alt: 'Denim Jeans' }],
        stock: 35,
        variants: [
          { color: 'Dark Blue', size: '28' },
          { color: 'Dark Blue', size: '30' },
          { color: 'Dark Blue', size: '32' },
          { color: 'Dark Blue', size: '34' },
        ],
        tags: ['bestseller'],
      },
      {
        name: 'Elegant Pearl Necklace',
        description: 'A beautiful pearl necklace that adds elegance to any outfit. Perfect for both casual and formal events.',
        price: 3499,
        category: categories[3]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', alt: 'Pearl Necklace' }],
        stock: 10,
        variants: [{ color: 'White Pearl', size: 'One Size' }],
        tags: ['featured'],
      },
    ]);

    // Create banners
    await Banner.insertMany([
      {
        title: 'Summer Collection',
        description: 'Discover our latest summer collection with amazing discounts',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=400&fit=crop',
        link: '/shop?category=summer',
        isActive: true,
      },
      {
        title: 'New Arrivals',
        description: 'Check out our newest products handpicked just for you',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
        link: '/shop?sort=new',
        isActive: true,
      },
    ]);

    res.json({
      success: true,
      message: 'Demo data seeded successfully',
      data: {
        categories: categories.length,
        products: products.length,
        banners: 2,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
