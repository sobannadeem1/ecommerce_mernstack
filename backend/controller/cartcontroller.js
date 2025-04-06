const cartSchema = require("../schema/cart");
const addtocart = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { user, quantity, product } = req.body;

    if (!user || !quantity || !product) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newcart = new cartSchema({ user, quantity, product });
    const cartsave = await newcart.save();

    if (cartsave) {
      return res.status(201).json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const getcartbyid = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId:", userId);

    const cart = await cartSchema.find({ user: userId }).populate("product");

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: error.message });
  }
};

const deletecart = async (req, res) => {
  try {
    const cartdelete = await cartSchema.findByIdAndDelete(req.params.id);
    if (!cartdelete) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully", cartdelete });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Some error in deleting :${error.message}` });
  }
};

module.exports = { addtocart, getcartbyid, deletecart };
