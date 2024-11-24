const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], default: 'Prefer not to say' },
  address: { type: String },
  role: { type: String, default: 'Admin' },
});

module.exports = mongoose.model('Admin', adminSchema);
