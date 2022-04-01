const express = require('express');

const router = express.Router();

const productController = require('../controller/productController');

const isAuth = require('../middleware/is-auth');

// /admin/add-product => GET
 router.get('/add-product', isAuth, productController.getAddProduct);

// /admin/add-product => POST
 router.post('/add-product', isAuth, productController.addProduct);

router.get('/admin-products', isAuth, productController.getAdminProducts);

router.get('/edit-product/:productId', isAuth, productController.getEditProduct);

router.post('/edit-product', isAuth ,productController.postEditProduct);

router.post('/delete-product', isAuth, productController.postDeleteProduct);

exports.routes = router;