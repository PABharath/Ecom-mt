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
    // review,
    // starRating,
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
      // review,
      // starRating: parseInt(starRating),
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

// exports.addReviewToProduct = async (req, res) => {
//   const { productId } = req.params;
//   const { starRating, comment, username } = req.body;

//   try {
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found." });
//     }

//     // Update the product with the new review
//     product.reviews.push({ starRating, comment, username });
//     await product.save();

//     res.status(200).json({ message: "Review added to product successfully." });
//   } catch (error) {
//     console.error("Error adding review to product:", error);
//     res.status(500).json({ error: "Failed to add review to product." });
//   }
// };
