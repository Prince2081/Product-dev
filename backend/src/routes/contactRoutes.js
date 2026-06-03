const express = require('express');
const router = express.Router();
const { getContacts, createContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getContacts)
  .post(createContact);

router.route('/:id')
  .delete(protect, deleteContact);

module.exports = router;
