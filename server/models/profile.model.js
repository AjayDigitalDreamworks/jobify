const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Skill name is required'],
    },
    level: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { _id: false }
);

const durationSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      trim: true,
      required: [true, 'Experience role is required'],
    },
    company: {
      type: String,
      trim: true,
      required: [true, 'Company name is required'],
    },
    duration: {
      type: durationSchema,
      required: [true, 'Experience duration is required'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Project title is required'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
      set(techStack) {
        if (!Array.isArray(techStack)) {
          return techStack;
        }

        return [...new Set(
          techStack
            .filter((technology) => typeof technology === 'string')
            .map((technology) => technology.trim().toLowerCase())
            .filter(Boolean)
        )];
      },
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    github: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      trim: true,
      required: [true, 'Degree is required'],
    },
    institution: {
      type: String,
      trim: true,
      required: [true, 'Institution is required'],
    },
    year: {
      type: Number,
      min: 1900,
      max: 3000,
      required: [true, 'Education year is required'],
    },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      default: '',
    },
    publicId: {
      type: String,
      trim: true,
      default: '',
    },
    extractedText: {
      type: String,
      trim: true,
      default: '',
    },
    cleanedText: {
      type: String,
      trim: true,
      default: '',
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
    pageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    parser: {
      type: String,
      trim: true,
      default: '',
    },
    parsedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    bio: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    skills: {
      type: [skillSchema],
      default: [],
      validate: {
        validator(skills) {
          const skillNames = skills.map((skill) => skill.name);
          return skillNames.length === new Set(skillNames).size;
        },
        message: 'Duplicate skills are not allowed',
      },
    },
    experience: {
      type: [experienceSchema],
      default: [],
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    education: {
      type: [educationSchema],
      default: [],
    },
    resume: {
      type: resumeSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

// Static method to create an empty profile for a new user
profileSchema.statics.buildEmptyProfile = function buildEmptyProfile(userId) {
  return new this({
    userId,
    bio: '',
    skills: [],
    experience: [],
    projects: [],
    education: [],
    resume: {},
  });
};

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
