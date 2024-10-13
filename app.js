const express = require('express');
const app = express();
const mongoose = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const methodOverride = require('method-override');
const session = require('express-session');
const ejs = require('ejs');
require('dotenv').config();



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

