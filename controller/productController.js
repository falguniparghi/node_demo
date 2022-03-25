const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll().
  then(
    result => {
      res.render('admin-products', {
        prods: result,
        pageTitle: 'Admin Products',
        path: '/admin-products',
      });
    }
  ).catch(err => {
    console.log(error);
  });
};

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    })
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const userID = req.user._id;
  const prod = new Product(title,
    price,
    imageURL,
    description,
    null,
    userID);
  prod.save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/admin-products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.fetchByID(prodID)
    .then(product => {
      res.render('edit-product', {
        product: product,
        pageTitle: 'Edit Products',
        path: '/admin/edit-product'
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.fetchByID(prodID)
    .then(product => {
      const prod = new Product(
        updatedTitle, updatedPrice, updatedImageUrl, updatedDesc , new ObjectId(prodID)
      );
      return prod.save();
    }).then( product => {
      console.log('Product Updated');
      res.redirect('/admin/admin-products');
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const Id = req.body.productId;
  Product.deleteByID(Id)
  .then(result => {
    console.log('Product Deleted');
    res.redirect('/admin/admin-products');
  })
  .catch(err => {
    console.log(err);
  });

}