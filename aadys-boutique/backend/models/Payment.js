const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      unique: true,
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    status: {
      type: String,
      enum: ['pending', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['card', 'netbanking', 'upi', 'wallet'],
      default: 'card'
    },
    description: String,
    receipt: String,
    notes: mongoose.Schema.Types.Mixed,
    failureReason: String,
    failureCode: String,
    capturedAt: Date,
    refundDetails: {
      refundId: String,
      refundAmount: Number,
      refundStatus: String,
      refundDate: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
