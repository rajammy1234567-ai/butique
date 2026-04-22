const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 12 } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .populate('category')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
  }
};

// Create product (Admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, variants, tags, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      variants,
      tags,
      stock,
      createdBy: req.user.id,
      stockStatus: stock > 0 ? 'in_stock' : 'out_of_stock'
    });

    await product.save();
    await product.populate('category');

    res.status(201).json({ success: true, message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

// Update product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, variants, tags, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        images,
        variants,
        tags,
        stock,
        stockStatus: stock > 0 ? 'in_stock' : 'out_of_stock'
      },
      { new: true, runValidators: true }
    ).populate('category');

    res.json({ success: true, message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// Delete product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

// Get trending products
exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ tags: 'trending' }).limit(8).populate('category');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trending', error: error.message });
  }
};

// Get categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ position: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
};

// Create category (Admin)
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, icon } = req.body;

    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
      icon
    });

    await category.save();
    res.status(201).json({ success: true, message: 'Category created', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};

// Update category (Admin)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category updated', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
};

// Delete category (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
};

