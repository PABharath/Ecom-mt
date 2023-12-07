const ProductModel = require('../models/productModel');

class ProductController {
  async getAllProducts(req, res) {
    const productModel = new ProductModel();
    await productModel.connect();

    try {
      const products = await productModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products.', details: error.message });
    } finally {
      await productModel.closeConnection();
    }
  }

  async getProductsByCategory(req, res) {
    const { category } = req.params;
    console.log('Category:', category);
  
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required.' });
    }
  
    const productModel = new ProductModel();
    await productModel.connect();
  
    try {
      const products = await productModel.getProductsByCategory(category);
      res.status(200).json(products);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      res.status(500).json({ error: 'Failed to fetch products.' });
    } finally {
      await productModel.closeConnection();
    }
  }

  async getProductById(req, res) {
    const { productId } = req.params;

    const productModel = new ProductModel();
    await productModel.connect();

    try {
      const product = await productModel.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Failed to fetch product details.' });
    } finally {
      await productModel.closeConnection();
    }
  }
}

module.exports = ProductController;
