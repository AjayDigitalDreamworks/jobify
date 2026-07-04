const Job = require('../models/job.model');
const Application = require('../models/application.model');

/**
 * @desc    Apply for a job
 * @route   POST /api/applications/apply/:jobId
 * @access  Private (jobSeeker only)
 */
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { _id: applicant } = req.user;
    const { coverLetter = '', resumeUrl = '', matchScore = null, notes = '' } = req.body;

    const job = await Job.findById(jobId).select('isActive');

    if (!job || !job.isActive) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({ applicant, job: jobId });

    if (existingApplication) {
      return res.status(409).json({ success: false, message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      applicant,
      job: jobId,
      coverLetter,
      resumeUrl,
      matchScore,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'You have already applied for this job' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyForJob,
};
