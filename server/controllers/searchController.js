const searchProducts = async (req, res) => {
    const { query } = req.query;
    let searchModel;
  
    try {
      searchModel = new SearchModel();
      await searchModel.connect();
  
      const searchResults = await searchModel.searchProducts(query);
  
      if (searchResults !== undefined) {
        res.json(searchResults);
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      if (searchModel) {
        await searchModel.closeConnection();
      }
    }
  };
  
  module.exports = { searchProducts };
  