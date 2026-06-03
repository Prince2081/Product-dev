const FAQ = require('../models/FAQ');

// GET all
exports.getFAQs = async (req, res) => {
  try {
    const data = await FAQ.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createFAQ = async (req, res) => {
  try {
    const newData = new FAQ(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
