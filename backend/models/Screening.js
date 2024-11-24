

// // const mongoose = require('mongoose');

// // // Screening schema
// // const screeningSchema = new mongoose.Schema({
// //   doctor: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Doctor', // Reference to the Doctor model
// //     required: false, // Optional field, can be added after the screening
// //   },
// //   volunteer: {
// //     type: String, // Storing the volunteer as a string
// //     required: true, // Required field
// //   },
// //   student: {
// //     type: String,
// //     required: true,
// //   },
// //   camp: {
// //     type: String,
// //     // ref: 'Camp', // Reference to the Camp model
// //     required: true,
// //   },
// //   report: {
// //     type: String, // Stores the screening report
// //     required: false, // Optional field, can be added after the screening
// //   },
// //   time: {
// //     type: Date, // Date and time of the screening
// //     default: Date.now, // Default to the current date and time
// //   },
// // });

// // module.exports = mongoose.model('Screening', screeningSchema);


// const mongoose = require('mongoose');

// const screeningSchema = new mongoose.Schema({
//   screeningId: {
//     type: String,
//     unique: true,
//     required: true,
//     default: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//     // This generates a random string like "a1b2c3d4e5f6"
//   },
//   doctor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor',
//     required: false,
//   },
//   volunteer: {
//     type: String,
//     required: true,
//   },
//   student: {
//     type: String,
//     required: true,
//   },
//   camp: {
//     type: String,
//     required: true,
//   },
//   report: { 
//     diagnosis: { type: String, required: true },
//     dateTime: { type: Date, required: true },
//     additionalDetails: { type: Array, default: [] },
//   },
//   time: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create an index on screeningId to ensure uniqueness
// screeningSchema.index({ screeningId: 1 }, { unique: true });

// module.exports = mongoose.model('Screening', screeningSchema);

const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  screeningId: {
    type: String,
    unique: true,
    required: true,
    default: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    // This generates a random string like "a1b2c3d4e5f6"
  },
    studentId: String,
    campId: String,
    volunteerId: String,
    volunteerName: String,
    doctorId: String,
    doctorName: String,
    date: Date,
    report: Object,
    doctorFeedback: {
        type: String,
        default: "",  
      },
    diagnosis: String
});

module.exports = mongoose.model('Screening', screeningSchema);
