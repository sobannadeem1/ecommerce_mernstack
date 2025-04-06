const userschema = require("../schema/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role || !req.file) {
      return res.status(400).json({ message: "All fields and image required" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: "profileImages" },
      async (error, cloudinaryResult) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        console.log("Cloudinary Upload Response:", cloudinaryResult);

        const user = new userschema({
          username,
          password,
          email,
          role,
          profileImage: cloudinaryResult.secure_url,
        });

        const savedUser = await user.save();
        return res.status(201).json({ message: "Success", user: savedUser });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ message: "All fields are required" });
    }

    const user = await userschema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user doesnt exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "email and passwords dont match" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTTOKEN,
      { expiresIn: "15d" }
    );

    return res.status(200).json({ message: "Success", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getuserprofile = async (req, res) => {
  try {
    console.log("Request User Data:", req.user);

    const userid = req.user.id;

    if (!userid) {
      return res.status(400).json({ message: "User ID is missing from token" });
    }

    const user = await userschema.findById(userid).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Success", user });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, getuserprofile };
