const Product = require('../models/product');


exports.getProduct = (req, res, next) => {
    Product.fetchAll().then(
      result => {
        console.log(result);
        res.render('shop', {
          prods: result,
          pageTitle: 'Shop',
          path: '/',
        });
      }
    ).catch(err => {
      console.log(error);
    });
};

exports.getProductDetails = (req, res, next) => {
  const prodID = req.params.productId;
  Product.fetchByID(prodID)
    .then(product => {
      res.render('product-details', {
        product: product,
        pageTitle: 'Admin Products',
        path: '/admin/product-details'
      });
    })
    .catch(err => console.log(err));
};

exports.getCartDetails = (req, res, next) => {
  req.user.getCart().then(
      result => {
        console.log(result);
        res.render('cart', {
          prods: '',
          pageTitle: 'Cart',
          path: '/',
        });
      }
    ).catch(err => {
      console.log(error);
    });
};

exports.addCartDetails = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.fetchByID(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};
