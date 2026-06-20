const mongoose = require('mongoose');
const Portfolio = require('./src/models/Portfolio');

const check = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/ai-solution');
  const count = await Portfolio.countDocuments();
  console.log('Portfolio count:', count);
  const items = await Portfolio.find().limit(2);
  console.log('Sample items:', items);
  process.exit();
};
check();
