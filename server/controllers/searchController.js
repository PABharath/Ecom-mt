// searchController.js

const Product = require('../models/addProductModel'); // Adjust the import based on your actual model file

const searchProducts = async (req, res) => {
  try {
    const { key, page, limit } = req.query; // Changed to req.query to get parameters from the query string
    const skip = (page - 1) * limit || 0; // Added default value for skip

    const search = key
      ? {
          $or: [
            { productName: { $regex: key, $options: 'i' } },
            { productDescription: { $regex: key, $options: 'i' } },
          ],
        }
      : {};

    const data = await Product.find(search).skip(skip).limit(parseInt(limit, 10) || 10); // Added parseInt for limit

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = {
  searchProducts,
};
