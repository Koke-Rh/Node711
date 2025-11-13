const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  _id: { type: Number }, // <--- ID del producto es número
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  categoryId: {
    type: Number, // <--- La relación ahora busca un número
    ref: 'Category',
    required: true
  },
  brandId: {
    type: Number, // <--- La relación ahora busca un número
    ref: 'Brand',
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
