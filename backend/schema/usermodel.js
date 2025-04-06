const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

userschema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error(`Error while hashing password: ${error}`);
    next(error);
  }
});

module.exports = mongoose.model("User", userschema);
