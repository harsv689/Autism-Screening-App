const express = require('express');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  approveUser,
  promoteToAdmin,
  deleteUser,
} = require('../controllers/adminController');

const router = express.Router();

// Admin routes
router.get('/users', auth, isAdmin, getAllUsers);
router.put('/approve/:id', auth, isAdmin, approveUser);
router.put('/promote/:id', auth, isAdmin, promoteToAdmin);
router.delete('/delete/:id', auth, isAdmin, deleteUser);

module.exports = router;
