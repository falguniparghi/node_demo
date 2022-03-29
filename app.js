const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const connectToDB = require('./util/database').connectToDB;

const User = require('./models/user');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('624193f1153724067dea03f4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
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