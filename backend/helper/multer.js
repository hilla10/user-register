import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter to accept any image type
const fileFilter = (req, file, cb) => {
  // Accept any mime type that starts with 'image/'
  if (!file.mimetype.startsWith('image/')) {
    // Reject the file if it's not an image
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true); // Accept the file
};

// Set up the file size limit (5MB in this case)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,

  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size of 5MB
});

// Middleware to handle errors and return JSON response
export const errorHandler = (err, req, res, next) => {
  if (err) {
    // Handle file size error
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds the 5MB limit.',
      });
    }

    // Handle file count error (exceeds maximum file count)
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'You cannot upload more than 1 files.', // Custom message
      });
    }

    // Handle unexpected file count error
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Too many files were uploaded unexpectedly.', // You can adjust the message
      });
    }

    // Handle Multer-specific errors
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Handle general errors
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

export default upload;
