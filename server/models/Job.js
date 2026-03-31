// models/Job.js
// Example Job model for MongoDB

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      required: true,
    },
    experience: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level'],
    },
    skills: [
      {
        type: String,
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Draft'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
