// const mongoose = require("mongoose");

// const otpSchema = new mongoose.Schema({
//   phone: { type: String, required: true },
//   otp: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 minutes
// });

// module.exports = mongoose.model("Otp", otpSchema);

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Otp", otpSchema);
