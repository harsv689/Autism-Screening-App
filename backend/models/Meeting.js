const mongoose = require('mongoose');
const meetingSchema = new mongoose.Schema({
    meetID: { type: String, required: true, unique: true },
    dateTime: { type: Date, required: true },
    campID: { type: String, required: true },
    doctor: { type: String, required: true },
    status: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Meeting', meetingSchema);