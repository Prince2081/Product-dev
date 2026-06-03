const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({ title: String, content: String, image: String, category: String, author: String }, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
