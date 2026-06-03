const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({ question: String, answer: String, category: String }, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
