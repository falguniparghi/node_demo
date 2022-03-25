const express = require('express');

const shopController = require('../controller/shopController');

const router = express.Router();

router.get('/', shopController.getProduct);

router.get('/products/:productId', shopController.getProductDetails);

// /cart/cart => GET
router.get('/cart', shopController.getCartDetails);
// /cart/cart => POST
router.post('/cart', shopController.addCartDetails);


module.exports = router;
