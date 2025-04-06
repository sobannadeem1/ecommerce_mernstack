const ordermodel = require("../schema/order");
const createorder = async (req, res) => {
  try {
    const { userid, products, totalPrice, status } = req.body;

    if (
      !userid ||
      !products ||
      !Array.isArray(products) ||
      !totalPrice ||
      !status
    ) {
      return res.status(400).json({
        message: "All fields are required and products must be an array",
      });
    }

    const newOrder = new ordermodel({ userid, products, totalPrice, status });
    const orderSave = await newOrder.save();

    if (orderSave) {
      return res
        .status(201)
        .json({ message: "Order created successfully", order: orderSave });
    }
  } catch (error) {
    console.error("Order creation error:", error);
    return res
      .status(500)
      .json({ message: "Error saving order", error: error.message });
  }
};

const getorderbyuserid = async (req, res) => {
  try {
    const userid = req.params.id;
    const finduser = await ordermodel
      .find({ userid })
      .populate("products.productid")
      .populate("userid");
    if (!finduser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ message: "order fetched successfully", finduser });
  } catch (error) {
    return res.status(404).json({ message: "some error" });
  }
};

const getallorders = async (req, res) => {
  try {
    const allorders = await ordermodel
      .find()
      .populate("products.productid")
      .populate({ path: "userid", select: "-password" });
    if (!allorders) {
      return res.status(404).json({ message: "orders not found" });
    }
    res.json({ message: "orders fetched successfully", allorders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};
const updateorder = async (req, res) => {
  try {
    const { orderid, status } = req.body;
    if (!orderid || !status) {
      return res
        .status(400)
        .json({ message: "orderid and status are required" });
    }
    const updatedOrder = await ordermodel.findByIdAndUpdate(
      orderid,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "order not found" });
    }
    res.json({ message: "order updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};
const deleteorder = async (req, res) => {
  try {
    const orderid = req.params.id;
    const deleteorder = await ordermodel.findByIdAndDelete(orderid);
    if (!deleteorder) {
      return res.status(404).json({ message: "order not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    return res.status(501).json({ false: error.message });
  }
};
module.exports = {
  createorder,
  getorderbyuserid,
  getallorders,
  updateorder,
  deleteorder,
};
