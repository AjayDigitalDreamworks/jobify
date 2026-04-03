const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;

  if (!dbURI) {
    throw new Error('MONGODB_URI is not configured');
  }

  await mongoose.connect(dbURI);
  console.log('Connected to MongoDB successfully');
};

module.exports = connectDB;
