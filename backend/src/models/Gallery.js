const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({ image: String, category: String, title: String, description: String }, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
