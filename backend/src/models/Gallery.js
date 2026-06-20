const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({ 
  type: String, 
  title: String, 
  date: String, 
  location: String, 
  img: String, 
  desc: String 
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
