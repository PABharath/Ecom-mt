// controllers/addProductController.js
const Product = require('../models/addProductModel');

exports.addProduct = async (req, res) => {
  const {
    productName,
    category,
    productDescription,
    occasion,
    primaryColor,
    material,
    borderType,
    colorFamily,
    fabric,
    secondaryColor,
    pattern,
    borderSize,
    type,
    review,
    starRating,
    mrp,
    sp,
  } = req.body;

  const productImages = req.files.map((file) => file.filename);

  const placeholderImages = [
    "placeholder-image-1.jpg",
    "placeholder-image-2.jpg",
    "placeholder-image-3.jpg",
  ];

  // Remove the placeholders from the array before inserting
  const imagesToInsert = productImages.filter(
    (image) => !placeholderImages.includes(image)
  );

  try {
    const product = new Product({
      productName,
      category,
      productImages: imagesToInsert,
      productDescription,
      occasion,
      primaryColor,
      material,
      borderType,
      colorFamily,
      fabric,
      secondaryColor,
      pattern,
      borderSize,
      type,
      review,
      starRating: parseInt(starRating),
      mrp: parseFloat(mrp),
      sp: parseFloat(sp),
    });

    await product.save();
    console.log("Product inserted:", product._id);

    res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Failed to add product." });
  }
};
