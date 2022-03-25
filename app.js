const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


const adminRoutes = require('./routes/user');
const shopRoutes = require('./routes/view');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {title:'Page Not found', content:'Page Not found'});
});

app.listen(3001);
