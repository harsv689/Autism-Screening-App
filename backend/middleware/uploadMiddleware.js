


const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// File filter for specific types (audio/video)
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'video/mp4', 'video/mpeg'];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type'), false);
//   }
// };

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/mpeg', 
      'audio/wav', 
      'video/mp4', 
      'video/mpeg',
      'video/webm',
      // Consider adding more mime types if needed
      'audio/x-m4a',
      'audio/ogg',
      'video/quicktime'
    ];
  
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  };
  
// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // Limit to 50MB
});

module.exports = upload;
