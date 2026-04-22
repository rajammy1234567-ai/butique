const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const bannerController = require('../controllers/bannerController');
const seedRoutes = require('./seedRoutes');
const { authenticateToken, adminProtect } = require('../middleware/auth');

// ====== SEED ROUTES (Demo Data) ======
router.use('/seed', seedRoutes);

// ====== AUTH ROUTES ======
router.post('/auth/register', authController.registerUser);
router.post('/auth/login-otp', authController.loginWithOTP);
router.post('/auth/verify-otp', authController.verifyOTP);
router.post('/auth/login', authController.loginWithPassword);
router.get('/auth/me', authenticateToken, authController.getCurrentUser);
router.put('/auth/profile', authenticateToken, authController.updateUserProfile);
router.post('/auth/address', authenticateToken, authController.addAddress);
router.post('/auth/promote-admin', authController.promoteToAdmin);

// ====== PRODUCT ROUTES ======
router.get('/products', productController.getAllProducts);
router.get('/products/trending', productController.getTrendingProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', authenticateToken, adminProtect, productController.createProduct);
router.put('/products/:id', authenticateToken, adminProtect, productController.updateProduct);
router.delete('/products/:id', authenticateToken, adminProtect, productController.deleteProduct);

// ====== CATEGORY ROUTES ======
router.get('/categories', productController.getCategories);
router.post('/categories', authenticateToken, adminProtect, productController.createCategory);
router.put('/categories/:id', authenticateToken, adminProtect, productController.updateCategory);
router.delete('/categories/:id', authenticateToken, adminProtect, productController.deleteCategory);

// ====== BANNER ROUTES ======
router.get('/banners', bannerController.getAllBanners);
router.get('/banners/:id', bannerController.getBannerById);
router.post('/banners', authenticateToken, adminProtect, bannerController.createBanner);
router.put('/banners/:id', authenticateToken, adminProtect, bannerController.updateBanner);
router.delete('/banners/:id', authenticateToken, adminProtect, bannerController.deleteBanner);
router.patch('/banners/:id/toggle', authenticateToken, adminProtect, bannerController.toggleBannerStatus);

// ====== ORDER ROUTES ======
router.post('/orders', authenticateToken, orderController.createOrder);
router.post('/orders/verify-payment', authenticateToken, orderController.verifyPayment);
router.get('/orders', authenticateToken, orderController.getUserOrders);
router.get('/orders/:id', authenticateToken, orderController.getOrderById);
router.put('/orders/:id/cancel', authenticateToken, orderController.cancelOrder);

// ====== ADMIN ROUTES ======
router.get('/admin/dashboard', authenticateToken, adminProtect, adminController.getDashboardStats);
router.get('/admin/orders', authenticateToken, adminProtect, orderController.getAllOrders);
router.put('/admin/orders/:id/status', authenticateToken, adminProtect, orderController.updateOrderStatus);
router.get('/admin/users', authenticateToken, adminProtect, adminController.getAllUsers);
router.get('/admin/users/:id', authenticateToken, adminProtect, adminController.getUserDetails);
router.put('/admin/users/:id/status', authenticateToken, adminProtect, adminController.updateUserStatus);

module.exports = router;
