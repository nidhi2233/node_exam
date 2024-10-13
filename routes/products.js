const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.render('products/index', { products });
    } catch (err) {
      res.status(500).send('Error retrieving products');
    }
  });

router.get('/new', async (req, res) => {
  const categories = await Category.find();
  res.render('products/new', { categories });
});

router.post('/new', async (req, res) => {
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  await product.save();
  res.redirect('/products');
});

router.get('/new', async (req, res) => {
    const categories = await Category.find();
    res.render('products/new', { categories });
  });
  

router.get('/edit/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  const categories = await Category.find();
  res.render('products/edit', { product, categories });
});

router.post('/edit/:id', async (req, res) => {
  const { name, price, category } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, category });
  res.redirect('/products');
});

router.delete('/:id', async (req, res) => {
  console.log(`Deleting product with ID: ${req.params.id}`);
  await Product.findByIdAndRemove(req.params.id);
  res.redirect('/products');
});


module.exports = router;
