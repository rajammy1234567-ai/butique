const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  phone: String,
  isDefault: Boolean
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6
    },
    addresses: [addressSchema],
    isAdmin: {
      type: Boolean,
      default: false
    },
    profileImage: {
      type: String,
      default: null
    },
    otp: {
      code: String,
      expiry: Date
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    },
    lastLogin: Date,
    createdBy: {
      type: String,
      default: 'self_registration'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
