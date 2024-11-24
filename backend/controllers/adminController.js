// const User = require('../models/User');
// const Admin = require('../models/Admin');

// // Fetch all registered users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch users', error });
//   }
// };

// // Approve a user (e.g., Doctors or NGO Workers)
// exports.approveUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User approved successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error approving user', error });
//   }
// };

// // Promote a user to admin
// exports.promoteToAdmin = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndUpdate(id, { role: 'Admin' }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User promoted to admin successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error promoting user to admin', error });
//   }
// };

// // Delete a user
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };

const User = require('../models/User');

// Fetch all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Approve a user (e.g., Doctors or NGO Workers)
exports.approveUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User approved successfully', user });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ message: 'Error approving user', error });
  }
};

// Promote a user to admin
exports.promoteToAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { role: 'Admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User promoted to admin successfully', user });
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    res.status(500).json({ message: 'Error promoting user to admin', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
