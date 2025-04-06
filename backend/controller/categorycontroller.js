const categorymodel = require("../schema/category");

const categorypost = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({ message: "name is required" });
  }
  const checking = await new categorymodel({ name });
  const saving = await checking.save();
  return res.status(200).json({ message: "success", saving });
};
const categoryfetch = async (req, res) => {
  const fetching = await categorymodel.find();
  if (!fetching) {
    return res.status(404).json({ message: "No data found" });
  }
  return res.status(200).json({ message: "success", fetching });
};
const categoryupdate = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedCategory = await categorymodel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Success", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const categorydelete = async (req, res) => {
  try {
    const category = await categorymodel.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  categorypost,
  categoryfetch,
  categoryupdate,
  categorydelete,
};
