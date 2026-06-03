const express = require('express');
const router = express.Router();
const { getSubscribers, createSubscriber, deleteSubscriber } = require('../controllers/subscriberController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getSubscribers)
  .post(protect, createSubscriber);

router.route('/:id')
  .delete(protect, deleteSubscriber);

module.exports = router;
