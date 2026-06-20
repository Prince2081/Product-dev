const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({ 
  title: String, 
  category: String, 
  desc: String, 
  tags: [String],
  img: String,
  liveUrl: String 
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
