const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
