const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({ email: { type: String, unique: true }, active: { type: Boolean, default: true } }, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
