const express = require('express');

const shopController = require('../controller/shopController');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getProduct);

router.get('/products/:productId', shopController.getProductDetails);

// /cart/cart => GET
router.get('/cart', isAuth, shopController.getCartDetails);
// /cart/cart => POST
router.post('/cart', isAuth, shopController.addCartDetails);

// /cart/cart-delete-item => POST
router.post('/cart-delete-item', isAuth, shopController.deleteCartItems);

// /create-order => POST
router.post('/create-order', isAuth, shopController.postOrder);

// /order => get
router.get('/orders',isAuth, shopController.getOrderDetails);


module.exports = router;
