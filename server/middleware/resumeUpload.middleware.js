const path = require('path');
const multer = require('multer');

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_RESUME_SIZE_BYTES,
  },
  fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const isPdf = file.mimetype === 'application/pdf' && extension === '.pdf';

    if (!isPdf) {
      cb(new Error('Only PDF resume files are allowed'));
      return;
    }

    cb(null, true);
  },
});

const handleResumeUpload = (req, res, next) => {
  upload.single('resume')(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Resume file cannot exceed 5MB' });
    }

    return res.status(400).json({ message: error.message || 'Invalid resume upload' });
  });
};

module.exports = handleResumeUpload;
