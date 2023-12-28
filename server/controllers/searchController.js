// controllers/SearchController.js
const Search = require("../models/searchModel");

const searchController = {
  liveSearch: async (req, res) => {
    try {
      const { query } = req.params;
      const results = await Search.find({
        $or: [
          { productName: { $regex: new RegExp(query, 'i') } },
          { productDescription: { $regex: new RegExp(query, 'i') } },
          // Add other fields as needed
        ],
      });
      res.json(results);
    } catch (error) {
      console.error('Error in liveSearch:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = searchController;
