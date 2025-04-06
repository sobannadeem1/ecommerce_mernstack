const mongoose = require("mongoose");

const connection = async () => {
  try {
    const response = await mongoose.connect(process.env.DB);
    if (response) {
      console.log("Connected");
    } else {
      console.log("Failed to connect");
    }
  } catch (error) {
    console.log(`Some Error :${error.message}`);
  }
};
module.exports = connection;
