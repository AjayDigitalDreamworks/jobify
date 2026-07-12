const mongoose = require('mongoose');

const applicationTimelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'interviewing', 'rejected', 'withdrawn'],
      required: true,
      lowercase: true,
      trim: true,
    },
    at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant is required'],
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'interviewing', 'rejected', 'withdrawn'],
      default: 'applied',
      lowercase: true,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      default: '',
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: '',
    },
    matchScore: {
      type: Number,
      min: [0, 'Match score cannot be less than 0'],
      max: [100, 'Match score cannot be greater than 100'],
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    timeline: {
      type: [applicationTimelineSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ applicant: 1, job: 1 }, { unique: true });

module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);
