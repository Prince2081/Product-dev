const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({ name: String, email: String, phone: String, company: String, country: String, jobTitle: String, jobDetails: String, status: { type: String, default: "Pending" } }, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
