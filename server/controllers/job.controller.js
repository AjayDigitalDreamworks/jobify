const Job = require('../models/Job');

/**
 * @desc    Create a new job
 * @route   POST /api/jobs/create
 * @access  Private (Recruiter only)
 */
const createJob = async (req, res) => {
  try {
    // req.user is populated by authMiddleware
    // req.user.role is checked by roleMiddleware('recruiter')
    const { _id: createdBy } = req.user;

    const job = await Job.create({ ...req.body, createdBy });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Public
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).select('title company location');
    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select(
      'title description salaryMin salaryMax skillsRequired company'
    );
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a job by ID
 * @route   PUT /api/jobs/:id
 * @access  Private (Recruiter only, owner only)
 */
const updateJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { _id: userId } = req.user;

    let job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ownership check: Ensure the job's creator matches the authenticated user
    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators on the update operation
    });
    return res.status(200).json({ success: true, job });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a job by ID
 * @route   DELETE /api/jobs/:id
 * @access  Private (Recruiter only, owner only)
 */
const deleteJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { _id: userId } = req.user;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ownership check: Ensure the job's creator matches the authenticated user
    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};