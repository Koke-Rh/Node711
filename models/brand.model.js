const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
  _id: { type: Number },
  brandName: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Brand', BrandSchema);
