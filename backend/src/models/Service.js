const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({ title: String, description: String, icon: String, features: [String] }, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
