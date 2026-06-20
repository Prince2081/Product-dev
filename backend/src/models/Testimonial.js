const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({ name: String, role: String, company: String, content: String, avatar: String, rating: { type: Number, default: 5 } }, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
