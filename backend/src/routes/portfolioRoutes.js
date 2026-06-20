const express = require('express');
const router = express.Router();
const { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getPortfolios)
  .post(protect, createPortfolio);

router.route('/:id')
  .put(protect, updatePortfolio)
  .delete(protect, deletePortfolio);

module.exports = router;
