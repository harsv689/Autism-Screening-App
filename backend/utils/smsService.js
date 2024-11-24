const axios = require('axios');

// Function to send SMS using Phone.Email
const sendSMS = async (user_json_url) => {
  try {
    const response = await axios.get(user_json_url);

    if (response.status === 200) {
      console.log("Phone verification data:", response.data);
      return response.data; // Return verified data
    } else {
      console.error("Failed to fetch phone verification data:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error during phone verification:", error.message);
    throw error;
  }
};

module.exports = sendSMS;
