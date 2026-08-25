const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Job title cannot be more than 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [50, 'Company name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      maxlength: [1000, 'Job description cannot be more than 1000 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [50, 'Location cannot be more than 50 characters'],
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], // Added 'Contract' as a common type
      required: [true, 'Employment type is required'],
    },
    workMode: {
      type: String,
      enum: ['Remote', 'Hybrid', 'Onsite'],
      required: [true, 'Work mode is required'],
    },
    salaryMin: {
      type: Number,
      required: [true, 'Minimum salary is required'],
      min: [0, 'Minimum salary cannot be negative'],
    },
    salaryMax: {
      type: Number,
      required: [true, 'Maximum salary is required'],
      min: [0, 'Maximum salary cannot be negative'],
      validate: {
        validator: function (value) {
          return this.salaryMin <= value;
        },
        message: 'Maximum salary ({VALUE}) must be greater than or equal to minimum salary',
      },
    },
    skillsRequired: {
      type: [String],
      required: [true, 'At least one skill is required'],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0 && value.every((skill) => typeof skill === 'string' && skill.trim().length > 0);
        },
        message: 'At least one skill is required',
      },
    },
    extractedSkills: {
      type: [String],
      default: [],
      set(skills) {
        if (!Array.isArray(skills)) {
          return skills;
        }

        const seen = new Set();

        return skills.reduce((accumulator, skill) => {
          if (typeof skill !== 'string') {
            return accumulator;
          }

          const normalizedSkill = skill.trim();
          const key = normalizedSkill.toLowerCase();

          if (!normalizedSkill || seen.has(key)) {
            return accumulator;
          }

          seen.add(key);
          accumulator.push(normalizedSkill);
          return accumulator;
        }, []);
      },
    },
    experienceLevel: {
      type: String,
      enum: ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Director'], // Common experience levels
      required: [true, 'Experience level is required'],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // References the User model
      required: [true, 'Job must be created by a user'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Job', JobSchema);
