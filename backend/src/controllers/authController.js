const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const sendEmail = require('../utils/sendEmail');

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
    if (!admin && username === 'admin' && password === 'Admin@123') {
       admin = await Admin.create({
         username: 'admin',
         name: 'Super Admin',
         password: 'Admin@123', // Admin model should handle bcrypt hashing
         email: 'admin@aisolution.com.np'
       });
    }

    if (admin && (await admin.matchPassword(password))) {
      // Generate 6 digit OTP for Email Verification
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      admin.emailVerificationCode = otpCode;
      admin.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      await admin.save();

      // Send Email
      await sendEmail({
        email: admin.email,
        subject: 'Your Admin Login Verification Code',
        message: `Your verification code is: ${otpCode}`,
        code: otpCode
      });

      return res.json({ _id: admin._id, requiresEmailOTP: true });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Email OTP login
// @route   POST /api/admin/login/verify-email
// @access  Public
const verifyEmailLogin = async (req, res) => {
  const { _id, token } = req.body;
  try {
    const admin = await Admin.findById(_id);
    if (!admin || !admin.emailVerificationCode) {
      return res.status(401).json({ message: 'Invalid request or code expired' });
    }

    if (admin.emailVerificationExpires < Date.now()) {
      admin.emailVerificationCode = undefined;
      admin.emailVerificationExpires = undefined;
      await admin.save();
      return res.status(401).json({ message: 'Verification code expired' });
    }

    if (admin.emailVerificationCode !== token) {
      return res.status(401).json({ message: 'Invalid verification code' });
    }

    // Code matches and is valid
    admin.emailVerificationCode = undefined;
    admin.emailVerificationExpires = undefined;
    await admin.save();

    // Check if Authenticator 2FA is also enabled
    if (admin.isTwoFactorEnabled) {
      return res.json({ _id: admin._id, requires2FA: true });
    }

    // All clear
    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Verify 2FA login
// @route   POST /api/admin/login/verify
// @access  Public
const verify2FALogin = async (req, res) => {
  const { _id, token } = req.body;
  try {
    const admin = await Admin.findById(_id);
    if (!admin || !admin.isTwoFactorEnabled) {
      return res.status(401).json({ message: 'Invalid 2FA request' });
    }
    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1
    });

    if (verified) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      isTwoFactorEnabled: admin.isTwoFactorEnabled,
    });
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
const updateAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.username = req.body.username || admin.username;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
      isTwoFactorEnabled: updatedAdmin.isTwoFactorEnabled,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};

// @desc    Generate 2FA secret and QR code
// @route   POST /api/admin/2fa/generate
// @access  Private
const generate2FA = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    const secret = speakeasy.generateSecret({ name: `AI Solution Admin (${admin.email})` });
    
    admin.twoFactorSecret = secret.base32;
    await admin.save();

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) throw err;
      res.json({ qrCode: data_url, secret: secret.base32 });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enable 2FA
// @route   POST /api/admin/2fa/enable
// @access  Private
const enable2FA = async (req, res) => {
  const { token } = req.body;
  try {
    const admin = await Admin.findById(req.admin._id);
    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1
    });

    if (verified) {
      admin.isTwoFactorEnabled = true;
      await admin.save();
      res.json({ message: '2FA enabled successfully' });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Disable 2FA
// @route   POST /api/admin/2fa/disable
// @access  Private
const disable2FA = async (req, res) => {
  const { token } = req.body;
  try {
    const admin = await Admin.findById(req.admin._id);
    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1
    });

    if (verified) {
      admin.isTwoFactorEnabled = false;
      admin.twoFactorSecret = undefined;
      await admin.save();
      res.json({ message: '2FA disabled successfully' });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authAdmin,
  verifyEmailLogin,
  verify2FALogin,
  getAdminProfile,
  updateAdminProfile,
  generate2FA,
  enable2FA,
  disable2FA
};
