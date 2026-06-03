const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getFAQs)
  .post(protect, createFAQ);

router.route('/:id')
  .delete(protect, deleteFAQ);

module.exports = router;
