const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const connectToDB = require('./util/database').connectToDB;

const User = require('./models/user');

const mongodb = require('mongodb');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('cehcking for user');
  id = '623d657dc8ad5a02ff08c931';
  User.fetchByID(id).then(
    user => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      console.log(req.user);
      next();
    }
  ).catch(err => {
    console.log(err);
  });
});


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

connectToDB((client) => {
  console.log(client);
  app.listen(3000);
})


