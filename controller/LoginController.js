const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.getLoginPage = (req, res, next) => {
    let error = req.flash('error');
    if(error.length > 0) {
        error = error['0'];
    } else {
        error = null; 
    }

    res.render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      isAuthenticated: false,
      errorMessage : error
    })
};

exports.getSignup = (req, res, next) => {
    let error = req.flash('error');
    if(error.length > 0) {
        error = error['0'];
    } else {
        error = null; 
    }
    res.render('auth/signup', {
      pageTitle: 'Signup',
      path: '/signup',
      isAuthenticated: false,
      errorMessage : error
    })
};

exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/signup', {
            pageTitle: 'SignUp',
            path: '/signup',
            isAuthenticated: false,
            errorMessage : errors.array()['0'].msg
          })
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 8)
        .then(hasedPwd => {
            const user = new User({
                name: name,
                email: email,
                password: hasedPwd,
                cart: { items: [] }
            })
            return user.save()
        })
        .then(result => {
            console.log(result);
            return res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postLoginPage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render('auth/login', {
            pageTitle: 'Login',
            path: '/login',
            isAuthenticated: false,
            errorMessage : errors.array()['0'].msg
          })
    }
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(result => {
        res.redirect('/');
    })
}