const Review = require("../schema/review");

const reviewcreate = async (req, res) => {
  try {
    const { product, user, rating, comment } = req.body;

    if (!product || !user || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const savedreview = await new Review({
      product,
      user,
      rating,
      comment,
    }).save();

    const newreview = await Review.findById(savedreview._id)
      .populate("product")
      .populate("user");

    return res
      .status(201)
      .json({ message: "Review created successfully", newreview });
  } catch (error) {
    console.error("Error creating review:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getreview = async (req, res) => {
  try {
    const reviewid = await Review.find();
    if (!reviewid) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review fetched successfully", reviewid });
  } catch (error) {
    return res.status(500).json({ message: `Some Error ${error.message}` });
  }
};
const getreviewbyid = async (req, res) => {
  try {
    const reviewid = await Review.findById(req.params.id);
    if (!reviewid) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review fetched successfully", reviewid });
  } catch (error) {
    return res.status(500).json({ message: `Some Error ${error.message}` });
  }
};
const deletereview = async (req, res) => {
  try {
    const deletereview = await Review.findByIdAndDelete(req.params.id);
    if (!deletereview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully", deletereview });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Some error in deleting :${error.message}` });
  }
};
const updatereview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const reviewid = req.params.id;

    if (!reviewid) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    if (!comment && !rating) {
      return res
        .status(400)
        .json({
          message: "At least one field (comment or rating) is required",
        });
    }

    const updating = await Review.findByIdAndUpdate(
      reviewid,
      { $set: { comment, rating } },
      { new: true, runValidators: true }
    );

    if (!updating) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully", updating });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = {
  reviewcreate,
  getreview,
  getreviewbyid,
  deletereview,
  updatereview,
};
