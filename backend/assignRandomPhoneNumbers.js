const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path to your User model

// Connect to MongoDB
mongoose.connect('mongodb+srv://arushsachdeva:dY0B3oYwJqTlGHjw@dsi.ullrh.mongodb.net/?retryWrites=true&w=majority&appName=DSI', { useNewUrlParser: true, useUnifiedTopology: true });

const generateRandomPhoneNumber = () => {
  const prefix = "+91"; // Assuming Indian phone numbers
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generate 10-digit random number
  return `${prefix}${randomNumber}`;
};

async function assignPhoneNumbers() {
  try {
    const usersWithoutPhone = await User.find({ phone: { $exists: false } }); // Find users without a phone field

    for (const user of usersWithoutPhone) {
      const uniquePhone = generateRandomPhoneNumber();

      await User.updateOne(
        { _id: user._id },
        { $set: { phone: uniquePhone } }
      );
      console.log(`Assigned phone ${uniquePhone} to user ${user._id}`);
    }

    console.log("Phone numbers assigned to all users without phone numbers.");
  } catch (error) {
    console.error("Error assigning phone numbers:", error);
  } finally {
    mongoose.disconnect();
  }
}

assignPhoneNumbers();
