/*
  PHASE 2.2: CREATE + GET PROFILE API
  Completed: 2026-05-29
  Note: Added this comment to record phase work for Git history.
*/

const Profile = require('../models/profile.model');

const pickProfileFields = (body = {}) => {
  const {
    bio,
    skills,
    experience,
    projects,
    education,
    resume,
  } = body;

  return {
    ...(bio !== undefined && { bio }),
    ...(skills !== undefined && { skills }),
    ...(experience !== undefined && { experience }),
    ...(projects !== undefined && { projects }),
    ...(education !== undefined && { education }),
    ...(resume !== undefined && { resume }),
  };
};

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      return res.status(409).json({ message: 'Profile already exists for this user' });
    }

    const profileData = pickProfileFields(req.body);
    const profile = await Profile.create({
      userId,
      ...profileData,
    });

    return res.status(201).json({
      message: 'Profile created successfully',
      profile,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Profile already exists for this user' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({
      message: 'Profile fetched successfully',
      profile,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createProfile,
  getMyProfile,
};
