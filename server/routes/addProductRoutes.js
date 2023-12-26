// routes/addProductRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const addProductController = require('../controllers/addProductController');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/addproducts', upload.array('productImages'), addProductController.addProduct);
// router.post('/products/:productId/reviews', addProductController.addReviewToProduct);


module.exports = router;
            