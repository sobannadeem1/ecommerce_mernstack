const cloudinary = require("cloudinary").v2;

const uploadimagetocloudinary = async (file) => {
  if (!file) {
    throw new Error("File is undefined");
  }

  try {
    // Convert the buffer to Base64 format
    const base64str = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64str, {
      folder: "products",
      resource_type: "auto",
    });

    return uploadResult.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadimagetocloudinary;
