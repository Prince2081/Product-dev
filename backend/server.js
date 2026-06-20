const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', require('./src/routes/authRoutes'));
app.use('/api/contacts', require('./src/routes/contactRoutes'));
app.use('/api/services', require('./src/routes/serviceRoutes'));
app.use('/api/blogs', require('./src/routes/blogRoutes'));
app.use('/api/portfolio', require('./src/routes/portfolioRoutes'));
app.use('/api/gallery', require('./src/routes/galleryRoutes'));
app.use('/api/faqs', require('./src/routes/faqRoutes'));
app.use('/api/testimonials', require('./src/routes/testimonialRoutes'));
app.use('/api/team', require('./src/routes/teammemberRoutes'));
app.use('/api/chat', require('./src/routes/chatRoutes'));
app.get('/', (req, res) => {
  res.send('AI Solution API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
