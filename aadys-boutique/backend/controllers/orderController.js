const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ success: false, message: 'Shipping address required' });
    }

    // Generate unique Order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = new Order({
      orderId,
      userId: req.user.id,
      items,
      totalAmount,
      finalAmount: totalAmount,
      shippingAddress,
      orderStatus: 'placed',
      paymentStatus: 'pending'
    });

    await order.save();

    // Create Razorpay order
    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // amount in paise
        currency: 'INR',
        receipt: orderId,
        notes: {
          orderId: order._id,
          userId: req.user.id
        }
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
        razorpayOrderId: razorpayOrder.id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (razorpayError) {
      console.error('Razorpay error:', razorpayError);
      return res.status(500).json({
        success: false,
        message: 'Failed to create payment order',
        error: razorpayError.message
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

// Verify Razorpay payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify Razorpay signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Update order with payment details
    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.statusHistory.push({
      status: 'confirmed',
      changedAt: new Date(),
      changedBy: req.user.id,
      notes: 'Payment confirmed'
    });

    await order.save();

    // Create payment record
    const payment = new Payment({
      paymentId: razorpay_payment_id,
      orderId: order._id,
      userId: req.user.id,
      razorpayOrderId,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature,
      amount: order.totalAmount,
      status: 'captured',
      method: 'card',
      capturedAt: new Date()
    });

    await payment.save();

    res.json({
      success: true,
      message: 'Payment verified and order confirmed',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment verification error', error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.productId');

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order', error: error.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, notes, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        deliveryNotes: notes,
        trackingNumber,
        estimatedDelivery
      },
      { new: true }
    );

    // Add to status history
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: req.user.id,
      notes
    });

    await order.save();

    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;
    let filter = {};

    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .populate('userId')
      .populate('items.productId')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    order.orderStatus = 'cancelled';
    order.cancellationReason = reason;
    order.cancellationDate = new Date();
    order.statusHistory.push({
      status: 'cancelled',
      changedAt: new Date(),
      changedBy: req.user.id,
      notes: reason
    });

    await order.save();

    res.json({ success: true, message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel order', error: error.message });
  }
};
