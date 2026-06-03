const Subscriber = require('../models/Subscriber');

// GET all
exports.getSubscribers = async (req, res) => {
  try {
    const data = await Subscriber.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createSubscriber = async (req, res) => {
  try {
    const newData = new Subscriber(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
