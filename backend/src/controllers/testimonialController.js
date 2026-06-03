const Testimonial = require('../models/Testimonial');

// GET all
exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new
exports.createTestimonial = async (req, res) => {
  try {
    const newData = new Testimonial(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
