const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  tagline:     { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, required: true },
  category:    { type: String, required: true },
  tags:        [String],
  link:        { type: String, default: '#' },
  featured:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
