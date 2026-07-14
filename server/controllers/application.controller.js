const Job = require('../models/job.model');
const Application = require('../models/application.model');

const buildTimeline = (application) => {
  if (Array.isArray(application.timeline) && application.timeline.length > 0) {
    return application.timeline;
  }

  return [
    {
      status: 'applied',
      at: application.appliedAt,
    },
    {
      status: application.status,
      at: application.updatedAt,
    },
  ];
};

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

    if (req.user.role !== 'jobSeeker') {
      return res.status(403).json({ success: false, message: 'Forbidden: only job seekers can apply' });
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
      timeline: [{ status: 'applied', at: new Date() }],
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

    if (req.user.role !== 'jobSeeker') {
      return res.status(403).json({ success: false, message: 'Forbidden: only job seekers can view their applications' });
    }

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

/**
 * @desc    Get a single application by ID
 * @route   GET /api/applications/:id
 * @access  Private (jobSeeker only)
 */
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: applicant } = req.user;

    if (req.user.role !== 'jobSeeker') {
      return res.status(403).json({ success: false, message: 'Forbidden: only job seekers can view application details' });
    }

    const application = await Application.findById(id).populate('job', 'title company location employmentType workMode');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.applicant.toString() !== applicant.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient access' });
    }

    return res.status(200).json({
      success: true,
      application: {
        _id: application._id,
        job: application.job,
        status: application.status,
        resumeUrl: application.resumeUrl,
        coverLetter: application.coverLetter,
        appliedAt: application.appliedAt,
        updatedAt: application.updatedAt,
        timeline: buildTimeline(application),
      },
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all applications for a specific job (Recruiter only)
 * @route   GET /api/jobs/:jobId/applications
 * @access  Private (recruiter only, owner only)
 */
const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId || req.params.id;
    const { _id: recruiterId } = req.user;

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ success: false, message: 'Forbidden: only recruiters can view applicants' });
    }

    const job = await Job.findById(jobId).select('createdBy');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.createdBy.toString() !== recruiterId.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden: you can only view applications for your jobs' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email')
      .sort({ appliedAt: -1 });

    return res.status(200).json({
      success: true,
      applications: applications.map((application) => ({
        _id: application._id,
        candidate: {
          _id: application.applicant._id,
          name: application.applicant.name,
          email: application.applicant.email,
        },
        resumeUrl: application.resumeUrl,
        appliedAt: application.appliedAt,
        status: application.status,
        coverLetter: application.coverLetter,
      })),
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update application status (Recruiter only)
 * @route   PATCH /api/applications/:id/status
 * @access  Private (recruiter only, owner only)
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { _id: recruiterId } = req.user;

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ success: false, message: 'Forbidden: only recruiters can update application status' });
    }

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const application = await Application.findById(id).populate('job', 'createdBy');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.job.createdBy.toString() !== recruiterId.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden: you can only update applications for your jobs' });
    }

    const normalizedStatus = status.toLowerCase();

    if (application.status !== normalizedStatus) {
      application.timeline.push({ status: normalizedStatus, at: new Date() });
    }

    application.status = normalizedStatus;
    await application.save();

    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Withdraw an application
 * @route   DELETE /api/applications/:id
 * @access  Private (jobSeeker only)
 */
const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: applicant } = req.user;

    if (req.user.role !== 'jobSeeker') {
      return res.status(403).json({ success: false, message: 'Forbidden: only job seekers can withdraw applications' });
    }

    const application = await Application.findById(id).populate('job', 'title company');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.applicant.toString() !== applicant.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient access' });
    }

    if (application.status === 'withdrawn') {
      return res.status(409).json({ success: false, message: 'Application already withdrawn' });
    }

    application.status = 'withdrawn';
    application.timeline.push({ status: 'withdrawn', at: new Date() });
    await application.save();

    return res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
      application,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationById,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication,
};
