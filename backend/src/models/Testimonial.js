const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({ name: String, role: String, company: String, content: String, avatar: String }, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
