// const express = require('express');
// const upload = require('../middleware/uploadMiddleware');

// const router = express.Router();

// // Handle file uploads
// router.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//     res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
//   } catch (err) {
//     res.status(500).json({ error: 'Error uploading file' });
//   }
// });

// module.exports = router;


const express = require('express');
const upload = require('../middleware/uploadMiddleware');  // Import the multer middleware

const router = express.Router();

// Handle file uploads
// router.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     if (req.file) {
//       const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//       res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
//     } else {
//       res.status(400).json({ error: 'No file uploaded' });
//     }
//   } catch (err) {
//     console.error('Error uploading file:', err);
//     res.status(500).json({ error: 'Error uploading file' });
//   }
// });

router.post('/upload', upload.single('file'), (req, res) => {

    console.log(req.file);
    try {

      if (req.file) {
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.status(200).json({ 
          message: 'File uploaded successfully', 
          url: fileUrl,
          filename: req.file.filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        });
      } else {
        res.status(400).json({ error: 'No file uploaded' });
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Error uploading file', details: err.message });
    }
  });

  router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({
        error: 'File upload error',
        message: err.message
      });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({
        error: 'Unknown upload error',
        message: err.message
      });
    }
    next();
  });
  

module.exports = router;
