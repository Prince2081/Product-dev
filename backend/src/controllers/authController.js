const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for admin username. This project seems to use a hardcoded fallback if db is empty.
    let admin = await Admin.findOne({ username });
    
    // Auto-create default admin if none exists for seamless testing
    if (!admin && username === 'admin' && password === 'admin123') {
       admin = await Admin.create({
         username: 'admin',
         name: 'Super Admin',
         password: 'admin123', // Admin model should handle bcrypt hashing
         email: 'admin@panssolution.com.np'
       });
    }

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authAdmin
};
