// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log("Received data:", req.body); // Add this line for debugging
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'Email already in use' });
    

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error("Error during registration:", error); // Add this line for debugging
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token, role: user.role, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // exports.getUserDetails = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id); // `req.user` should contain decoded user info
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json({ name: user.name });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching user details', error });
// //   }
// // };

// exports.getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId); // Fetch by ID
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user details', error });
//   }
// };



// const admin = require('../firebase'); // Firebase Admin SDK
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require('../models/Otp');
const { sendOtpToPhone } = require('../utils/otpSender'); // Utility function to send OTP
const otpGenerator = require('otp-generator'); // For generating OTPs
const sendSMS = require('../utils/smsService'); // Utility function for sending SMS (you will need to implement this)
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// Temporary in-memory storage for OTPs (you can replace this with a database if needed)
const otpStore = {};



exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    console.log(`Generated OTP for ${phone}: ${otp}`);

    await Otp.findOneAndUpdate(
      { phone },
      { phone, otp, createdAt: new Date() },
      { upsert: true } // Create or update the OTP record
    );

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// exports.verifyOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   try {
//     const otpRecord = await Otp.findOne({ phone, otp });

//     if (!otpRecord) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }

//     // Check if OTP is older than 5 minutes
//     const now = new Date();
//     if (now - otpRecord.createdAt > 5 * 60 * 1000) {
//       return res.status(400).json({ message: "OTP has expired." });
//     }

//     await Otp.deleteMany({ phone }); // Clean up OTPs for this phone

//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({
//       token: `mock-token-${phone}`,
//       role: user.role,
//       isApproved: user.isApproved,
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ message: "Failed to verify OTP." });
//   }
// };

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ phone, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Check if OTP is older than 5 minutes
    const now = new Date();
    if (now - otpRecord.createdAt > 5 * 60 * 1000) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    await Otp.deleteMany({ phone }); // Clean up OTPs for this phone

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
     // Check if the user is approved
     if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is awaiting admin approval.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return token and role
    res.status(200).json({ token, role: user.role, isApproved: user.isApproved });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

//     res.status(200).json({
//       token: `mock-token-${phone}`,
//       role: user.role,
//       isApproved: user.isApproved,
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ message: "Failed to verify OTP." });
//   }
// };


exports.loginWithOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'Login successful',
      role: user.role, // Send user role for redirection
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};





// exports.register = async (req, res) => {
//   try {
//     // Check if this is the first user in the system
//     const isFirstUser = (await User.countDocuments({})) === 0;

//     // Create a new user
//     const user = new User({
//       ...req.body,
//       role: isFirstUser ? 'Admin' : req.body.role, // Assign 'Admin' role to the first user
//       isApproved: isFirstUser || req.body.role !== 'Doctor', // Approve admin or non-doctor roles by default
//     });

//     await user.save();

//     if (isFirstUser) {
//       res.status(201).json({ message: 'Admin created successfully' });
//     } else if (req.body.role === 'Doctor') {
//       res.status(201).json({ message: 'Doctor registration request sent for admin approval' });
//     } else {
//       res.status(201).json({ message: 'User registered successfully' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };

// // Register a new user
// exports.register = async (req, res) => {
//   try {
//     const { name, phone, address, gender, role } = req.body;

//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this phone number already exists.' });
//     }

//     const user = new User({
//       name,
//       phone,
//       address,
//       gender,
//       role,
//       isApproved: role === 'Admin', // Automatically approve Admin role
//     });

//     await user.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Failed to register user.' });
//   }
// };

// const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, phone, gender, address, role } = req.body;
  try {
    // Validate role
    const validRoles = ['Admin', 'NGO Worker', 'Doctor', 'Therapist', 'Volunteer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Create new user
    const user = new User({ name, phone, gender, address, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};


exports.approveDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Doctor approved successfully' , user });
  } catch (error) {
    res.status(500).json({ message: 'Error approving doctor', error });
  }
};

exports.assignAdmin = async (req, res) => {
  const { id } = req.params; // User ID tp promote to admin
  try {
    const user = await User.findByIdAndUpdate(id, { role: 'Admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User promoted to admin successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning admin role', error });
  }
};



exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Fetch by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};



