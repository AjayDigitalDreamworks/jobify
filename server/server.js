require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/jobify';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running ✅', timestamp: new Date() });
});

app.get('/api/jobs', (req, res) => {
  res.json({
    message: 'Jobs endpoint is working',
    jobs: []
  });
});

app.post('/api/jobs', (req, res) => {
  res.status(201).json({
    message: 'Job created successfully',
    data: req.body
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
