const Portfolio = require('../models/Portfolio');

// GET all
exports.getPortfolios = async (req, res) => {
  try {
    const data = await Portfolio.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createPortfolio = async (req, res) => {
  try {
    const newData = new Portfolio(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update
exports.updatePortfolio = async (req, res) => {
  try {
    const updatedData = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
