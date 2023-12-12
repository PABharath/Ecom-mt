const searchModel = require('../models/searchModel');

const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    const searchResults = await searchModel.searchProducts(query);
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchProducts };
