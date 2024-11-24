const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  qualifications: String,
  gender: String,
  phoneNumber: String,
  address: String,
  pastExperiences: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
