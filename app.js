const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const connectToDB = require('./util/database').connectToDB;

const User = require('./models/user');

const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');


const store = new MongoDBStore(
  {
    uri: '',
    databaseName: 'mongoose_db',
    collection: 'mySessions'
  });

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const loginRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'MyProject',
  resave: false,
  saveUninitialized: false,
  store: store,
}))

app.use(flash());
app.use(csrf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(loginRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found',
  path: '/404',
  isAuthenticated: req.session.isLoggedIn });
});


const uri = "mongodb+srv://falguniparghi:YXgWJZysasxsIQpe@cluster0.6drto.mongodb.net/mongoose_db?retryWrites=true&w=majority"
mongoose.connect(uri).then(
  res => {
    User.findOne().then(result => {
      if (!result) {
        const user = new User({
          name:'Falguni',
          email:'falguni1015@gmail.com',
          cart : {items : []}
        });
        user.save();
      }
    }
    )
    app.listen(3000);
  }
).catch(err => {
  console.log(err);
});