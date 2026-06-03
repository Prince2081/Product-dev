const Blog = require('../models/Blog');

// GET all
exports.getBlogs = async (req, res) => {
  try {
    const data = await Blog.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createBlog = async (req, res) => {
  try {
    const newData = new Blog(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
