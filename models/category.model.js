const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  _id: { type: Number }, // <--- FORZAMOS QUE EL ID SEA NÚMERO
  categoryName: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Category', CategorySchema);
