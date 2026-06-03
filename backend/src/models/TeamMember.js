const mongoose = require('mongoose');

const teammemberSchema = mongoose.Schema({ name: String, role: String, bio: String, photo: String, socialLinks: { linkedin: String, twitter: String } }, { timestamps: true });

module.exports = mongoose.model('TeamMember', teammemberSchema);
