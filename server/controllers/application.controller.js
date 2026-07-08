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
      return res.status(409).json({ success: false, message: 'Already Applied' });
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
      return res.status(409).json({ success: false, message: 'Already Applied' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get logged-in user's applications
 * @route   GET /api/applications/my
 * @access  Private (jobSeeker only)
 */
const getMyApplications = async (req, res) => {
  try {
    const { _id: applicant } = req.user;

    const applications = await Application.find({ applicant })
      .populate('job', 'title company')
      .sort({ appliedAt: -1 });

    return res.status(200).json({
      success: true,
      applications: applications.map((application) => ({
        _id: application._id,
        job: application.job,
        appliedAt: application.appliedAt,
        status: application.status,
      })),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
};
