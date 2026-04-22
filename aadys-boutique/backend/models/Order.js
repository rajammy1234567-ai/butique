const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  quantity: Number,
  price: Number,
  variant: {
    size: String,
    color: String
  },
  image: String
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    finalAmount: Number,
    shippingCost: {
      type: Number,
      default: 0
    },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'cod', 'upi'],
      default: 'razorpay'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'placed'
    },
    paymentId: String,
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
    deliveryNotes: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    cancellationReason: String,
    cancellationDate: Date,
    refundAmount: Number,
    refundDate: Date,
    statusHistory: [
      {
        status: String,
        changedAt: Date,
        changedBy: String,
        notes: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
