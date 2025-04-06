const ProductModel = require("../schema/product");
const uploadImageToCloudinary = require("../utils/fileupload");

const createProduct = async (req, res) => {
  try {
    const { name, quantity, price, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }
    console.log(req.file);

    const imageUrl = await uploadImageToCloudinary(file);

    const product = new ProductModel({
      name,
      quantity,
      price,
      description,
      category,
      image: imageUrl,
    });

    const savedProduct = await product.save();
    const newProduct = await ProductModel.findById(savedProduct._id).populate(
      "category"
    );

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getproducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category");
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getproductsbyid = async (req, res) => {
  try {
    const productId = req.params.id.trim();

    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await ProductModel.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const productdelete = await ProductModel.findByIdAndDelete(id);
    if (productdelete) {
      return res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateproduct = async (req, res) => {
  try {
    const productid = req.params.id;
    const file = req.file;
    let imageurl = null;

    if (file) {
      imageurl = await uploadImageToCloudinary(file);
    }

    const updatedData = { ...req.body };
    if (imageurl) {
      updatedData.imageurl = imageurl;
    }

    const productupdating = await ProductModel.findByIdAndUpdate(
      productid,
      updatedData,
      { new: true }
    );

    if (!productupdating) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated", product: productupdating });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getproducts,
  getproductsbyid,
  deleteProduct,
  updateproduct,
};
