const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .delete(protect, deleteBlog);

module.exports = router;
