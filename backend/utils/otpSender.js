// exports.sendOtpToPhone = (phone, otp) => {
//     // Integration with SMS provider
//     console.log(`Sending OTP ${otp} to phone number ${phone}`);
//   };
  
// const admin = require('../firebase');
// Import Firebase Admin

exports.sendOtpToPhone = async (phone) => {
  try {
    // Use Firebase Admin to send SMS OTP
    const result = await admin.auth().createCustomToken(phone);
    console.log(`OTP sent to phone number ${phone}. Token: ${result}`);
    return result; // Custom token can be used to authenticate
  } catch (error) {
    console.error('Error sending OTP via Firebase:', error);
    throw new Error('Failed to send OTP');
  }
};
