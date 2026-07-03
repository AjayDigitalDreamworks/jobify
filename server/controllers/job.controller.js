const Job = require('../models/job.model');

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

//Yeh function parseBooleanQuery ka kaam hai kisi input (value) ko boolean (true/false) me convert karna, 
//aur agar valid boolean na ho to default value return karna.
const parseBooleanQuery = (value, defaultValue) => { 
  if (value === undefined) {
    return defaultValue;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalizedValue = value.toLowerCase();
    if (normalizedValue === 'true') {
      return true;
    }
    if (normalizedValue === 'false') {
      return false;
    }
  }

  return defaultValue;
};

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Public
 */
const getAllJobs = async (req, res) => {
  try {
    // Destructure query parameters, providing default values
    const {
      page = 1,
      limit = 10,
      skills,
      salaryMin,
      salaryMax,
      employmentType,
      workMode,
      search,
      // By default, only show active jobs. Recruiters can opt into inactive jobs explicitly.
      isActive = true,
    } = req.query;

    const queryObject = { isActive: parseBooleanQuery(isActive, true) };

    if (skills) {
      // Assuming skills can be comma-separated, e.g., "react,node"
      // We want jobs that require ANY of the specified skills
      const skillsArray = skills.split(',').map((skill) => skill.trim());
      queryObject.skillsRequired = { $in: skillsArray }; //MongoDB me iska matlab hota hai Jo jobs me inme se koi bhi ek skill ho.
    } 
    
    if (salaryMin) {
      queryObject.salaryMax = { $gte: parseInt(salaryMin, 10) }; //$gte means greater than or equal to the specified minimum salary.
    }
    
    if (salaryMax) {
      queryObject.salaryMin = { ...queryObject.salaryMin, $lte: parseInt(salaryMax, 10) }; //$lte means less than or equal to the specified maximum salary.
    }

    if (employmentType) {
      queryObject.employmentType = employmentType;
    }

    if (workMode) {
      queryObject.workMode = workMode;
    }
    
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Regular Expression (Regex) ek pattern hota hai jo text me matching karta hai. 'i' for case-insensitive search
      queryObject.$or = [ // $or -> Inme se koi bhi condition true ho to document return kar do.
        { title: { $regex: searchRegex } },
        { company: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { skillsRequired: { $regex: searchRegex } },
      ];
    }

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    const jobs = await Job.find(queryObject)
      .select('title company location')
      .skip(skip)
      .limit(parsedLimit);

    const totalJobs = await Job.countDocuments(queryObject); // Sirf filtered jobs count hongi.
    const totalPages = Math.ceil(totalJobs / parsedLimit);
    return res.status(200).json({
      success: true,
      jobs,
      totalJobs,
      currentPage: parsedPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get jobs created by the authenticated recruiter
 * @route   GET /api/jobs/my-jobs
 * @access  Private (Recruiter only)
 */
const getMyJobs = async (req, res) => {
  try {
    const { _id: recruiterId } = req.user;

    const jobs = await Job.find({ createdBy: recruiterId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Close a job by ID
 * @route   PATCH /api/jobs/:id/close
 * @access  Private (Recruiter only, owner only)
 */
const closeJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { _id: userId } = req.user;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to close this job' });
    }

    if (!job.isActive) {
      return res.status(200).json({ success: true, message: 'Job is already closed', job });
    }

    job.isActive = false;
    await job.save();

    return res.status(200).json({ success: true, message: 'Job closed successfully', job });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
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
      'title description salaryMin salaryMax skillsRequired company isActive' // Added isActive to selection
    );
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    if (!job.isActive) {
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

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ownership check: Ensure the job's creator matches the authenticated user
    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this job' });
    }

    Object.assign(job, req.body);
    await job.save();

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
  getMyJobs,
  getJobById,
  updateJob,
  closeJob,
  deleteJob,
};
