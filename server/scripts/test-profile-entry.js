require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');

const TEST_EMAIL = 'profile.test@jobify.dev';

const run = async () => {
  await connectDB();

  const existingUser =
    (await User.findOne({ email: TEST_EMAIL }).select('+password')) ||
    (await User.create({
      name: 'Profile Test User',
      email: TEST_EMAIL,
      password: 'ProfileTest123',
      role: 'jobSeeker',
    }));

  const profile = await Profile.findOneAndUpdate(
    { userId: existingUser._id },
    {
      $setOnInsert: { // Only set these fields if a new profile is created
        bio: 'Auto-created profile document for backend verification.',
        skills: [],
        experience: [],
        projects: [],
        education: [],
        resume: {},
      },
    },
    {
      new: true, // Return the updated document (or the newly created one)
      upsert: true, // Create a new profile if one doesn't exist for the user
    }
  );

  console.log(
    JSON.stringify(
      {
        message: 'Profile test entry is ready',
        userId: existingUser._id.toString(),
        profileId: profile._id.toString(),
        email: existingUser.email,
      },
      null,
      2
    )
  );
};

run()
  .catch((error) => {
    console.error('Failed to create profile test entry:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
