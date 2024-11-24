const mongoose = require("mongoose"); // Import mongoose
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config(); // Load environment variables

// MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Admin Seeding Function
const seedAdmin = async () => {
  try {
    await connectDB();

    const adminUsers = [
      {
        name: "Super Admin",
        phone: "+919599660498", // Replace with your admin phone number
        gender: "N/A",
        address: "Admin HQ",
        role: "Admin", // Set role to Admin
        isApproved: true,
      },
    ];

    for (const admin of adminUsers) {
      // Check if the admin already exists in the database
      const existingAdmin = await User.findOne({ phone: admin.phone });
      if (existingAdmin) {
        console.log(`Admin user with phone ${admin.phone} already exists`);
      } else {
        // Create the admin user if not found
        await User.create(admin);
        console.log(`Admin user with phone ${admin.phone} created successfully`);
      }
    }

    process.exit(0); // Exit process successfully
  } catch (error) {
    console.error("Error seeding admins:", error);
    process.exit(1); // Exit process with failure
  }
};

seedAdmin();
