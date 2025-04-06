const mongoose = require("mongoose");

const categoryschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const categorymodel = new mongoose.model("category", categoryschema);
module.exports = categorymodel;
