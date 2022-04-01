const express = require('express');

const router = express.Router();

const loginController = require('../controller/loginController');

const { check, body} = require('express-validator');

const User = require('../models/user');
const bcrypt = require('bcryptjs');



// /login => GET
 router.get('/login', loginController.getLoginPage);

// /login => POST
router.post('/login',
    check('email')
        .isEmail()
        .withMessage('Invalid Email Address')
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (!user) {
                    return Promise.reject('Email Id is not registered');
                }
            });
        }),
    check('password')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .withMessage('Invalid Password')
        .custom((value, { req }) => {
            return User.findOne({ email: req.body.email })
                .then(user => {
                    const dbPassword = user.password;
                    return bcrypt.compare(value, dbPassword)
                })
                .then(bool => {
                    if (!bool) {
                        return Promise.reject('Invalid password!');
                    }
                })
        }),
    loginController.postLoginPage);

  // /login => POST
  router.post('/logout', loginController.logout);

  // /signup => POST
 router.get('/signup', loginController.getSignup);

// /signup => POST
router.post('/signup', 
    check('email')
    .isEmail()
    .withMessage('Invalid Email Address')
    .custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('Email Id is already exists');
            }
        });
    }),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.'
      )
        .isLength({ min: 5 })
        .isAlphanumeric(),
      body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      }),
    loginController.postSignup);


 module.exports = router;