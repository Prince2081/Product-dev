const express = require('express');
const router = express.Router();
const { getGallerys, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getGallerys)
  .post(protect, createGallery);

router.route('/:id')
  .put(protect, updateGallery)
  .delete(protect, deleteGallery);

module.exports = router;
