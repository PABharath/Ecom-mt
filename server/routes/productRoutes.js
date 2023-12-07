// productRoutes.js
const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();
const productController = new ProductController();

// Endpoint to get all products
router.get('/products', productController.getAllProducts);

// Endpoint to get products by category
router.get('/products/category/:category', productController.getProductsByCategory); // Change this line

// Endpoint to get product details by ID
router.get('/products/:productId', productController.getProductById);

module.exports = router;
