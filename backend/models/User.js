// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: [ 'NGO Worker', 'Doctor', 'Volunteer', 'Therapist'] },
// });

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true, unique: true},
//   gender: { type: String },
//   address: { type: String },
//   email: { type: String, unique: false, sparse: true }, // Mark `email` as non-unique and sparse
//   role: { type: String, required: true, enum: ['Admin','NGO Worker', 'Doctor'] },
//   isApproved: { type: Boolean, default: false }, // Admin approval
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // phone: { 
  //   type: String, 
  //   required: true, 
  //   unique: true,
  //   validate: {
  //     validator: function(v) {
  //       // Validate phone number format (e.g., +919XXXXXXXXX for India)
  //       return /^\+\d{10,15}$/.test(v); // Allows phone numbers with a '+' prefix and 10-15 digits
  //     },
  //     message: props => `${props.value} is not a valid phone number!`
  //   },
  // },

  // phone: { type: String, required: true, unique: true },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'], 
    default: 'Prefer not to say',
  },
  address: { type: String },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin","NGO Worker", "Doctor", "Therapist","Volunteer"], required: true },
  isApproved: { type: Boolean, default: false }, // Default to not approved

  // role: { 
  //   type: String, 
  //   required: true, 
  //   enum: ['Admin', 'NGO Worker', 'Doctor'], 
  // },
  // isApproved: { 
  //   type: Boolean, 
  //   default: false, 
  // }, // Admin approval
  // createdAt: { type: Date, default: Date.now }, // Timestamp for user creation
});

module.exports = mongoose.model('User', userSchema);
