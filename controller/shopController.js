const Product = require('../models/product');
const Order = require('../models/order');

exports.getProduct = (req, res, next) => {
    Product.find().then(
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
  Product.findById(prodID)
    .then(product => {
      res.render('product-details', {
        product: product,
        pageTitle: 'Admin Products',
        path: '/admin/product-details',
      });
    })
    .catch(err => console.log(err));
};

exports.getCartDetails = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('./cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
};

exports.addCartDetails = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(req.user);
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/cart');
    });
};

exports.deleteCartItems = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItems(prodId)
    .then(product => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrderDetails = (req, res, next) => {
  Order
  .find({ 'user.userId': req.user._id })
  .then(
    orders => {
      res.render('orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    }
  )
  .catch(err => {
    console.log(err)
  })

}
