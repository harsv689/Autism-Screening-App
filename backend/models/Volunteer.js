const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  volunteerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateTime: Date,
  gender: String,
  phoneNumber: String,
  address: String,
  pastHistory: String,
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
