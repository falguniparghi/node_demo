const express = require('express');

const shopController = require('../controller/shopController');

const router = express.Router();

router.get('/', shopController.getProduct);

router.get('/products/:productId', shopController.getProductDetails);

// /cart/cart => GET
router.get('/cart', shopController.getCartDetails);
// /cart/cart => POST
router.post('/cart', shopController.addCartDetails);

// /cart/cart-delete-item => POST
router.post('/cart-delete-item', shopController.deleteCartItems);

// /create-order => POST
router.post('/create-order', shopController.postOrder);

// /order => get
router.post('/order', shopController.getOrderDetails);

module.exports = router;
