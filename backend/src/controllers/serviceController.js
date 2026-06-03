const Service = require('../models/Service');

// GET all
exports.getServices = async (req, res) => {
  try {
    const data = await Service.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createService = async (req, res) => {
  try {
    const newData = new Service(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
