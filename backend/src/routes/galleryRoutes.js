const express = require('express');
const router = express.Router();
const { getGallerys, createGallery, deleteGallery } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getGallerys)
  .post(protect, createGallery);

router.route('/:id')
  .delete(protect, deleteGallery);

module.exports = router;
