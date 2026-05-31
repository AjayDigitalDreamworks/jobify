/*
  PHASE 2.2: CREATE + GET PROFILE API
  Completed: 2026-05-29
  Note: Added this comment to record phase work for Git history.
*/

const Profile = require('../models/profile.model');

const normalizeKey = (value = '') => value.toString().trim().toLowerCase(); //normalizeKey(" React ") => Output: "react"

const buildExperienceKey = (experience = {}) => (
  `${normalizeKey(experience.title)}::${normalizeKey(experience.company)}` //"sde::google"
);

const mergeArrayByKey = (existingItems = [], incomingItems = [], getKey) => {
  if (!Array.isArray(incomingItems)) { //Agar incoming data array nahi hai to kuch mat karo
    return existingItems;
  }

  const mergedItems = [...existingItems]; //Copy bana raha hai.

  incomingItems.forEach((incomingItem) => {
    if (!incomingItem || typeof incomingItem !== 'object') {
      return;
    }

    const incomingKey = getKey(incomingItem);

    if (!incomingKey || incomingKey === '::') { //Invalid key ignore.
      return;
    }

    const existingIndex = mergedItems.findIndex((item) => getKey(item) === incomingKey);

    if (existingIndex === -1) {
      mergedItems.push(incomingItem);
      return;
    }

    const existingItem = mergedItems[existingIndex];
    const existingObject = existingItem.toObject?.() || existingItem;

    mergedItems[existingIndex] = {
      ...existingObject,
      ...incomingItem,
    };
  });

  return mergedItems;
};

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

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const {
      bio,
      skills,
      projects,
      experience,
    } = req.body;

    if (bio !== undefined) {
      profile.bio = bio;
    }

    profile.skills = mergeArrayByKey( //Purane array ko lo, Naye array ko lo, Same key wale duplicates ko merge/remove karo, Unique items rakho
      profile.skills,
      skills,
      (skill) => normalizeKey(skill.name) //ek callback function hai jo har skill ke liye unique key banata hai.
    );

    profile.projects = mergeArrayByKey(
      profile.projects,
      projects,
      (project) => normalizeKey(project.title)
    );

    profile.experience = mergeArrayByKey(
      profile.experience,
      experience,
      buildExperienceKey
    );

    await profile.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createProfile,
  getMyProfile,
  updateProfile,
};
