const express = require('express');

const router = express.Router();

const productController = require('../controller/productController');

// /admin/add-product => GET
 router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
 router.post('/add-product', productController.addProduct);

router.get('/admin-products', productController.getAdminProducts);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.postEditProduct);

router.post('/delete-product', productController.postDeleteProduct);

exports.routes = router;