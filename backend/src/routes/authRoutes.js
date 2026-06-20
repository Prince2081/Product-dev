const express = require('express');
const router = express.Router();
const { authAdmin, verifyEmailLogin, verify2FALogin, getAdminProfile, updateAdminProfile, generate2FA, enable2FA, disable2FA } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', authAdmin);
router.post('/login/verify-email', verifyEmailLogin);
router.post('/login/verify', verify2FALogin);

router.route('/profile')
  .get(protect, getAdminProfile)
  .put(protect, updateAdminProfile);

router.post('/2fa/generate', protect, generate2FA);
router.post('/2fa/enable', protect, enable2FA);
router.post('/2fa/disable', protect, disable2FA);

module.exports = router;
