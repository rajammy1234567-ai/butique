const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: {
      type: String,
      required: true
    },
    link: String,
    position: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    bannerType: {
      type: String,
      enum: ['hero', 'promotion', 'seasonal', 'sale', 'collection', 'instagram'],
      default: 'promotion'
    },
    startDate: Date,
    endDate: Date,
    cta_text: String,
    cta_link: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
