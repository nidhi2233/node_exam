const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Route to view all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('categories/index', { categories });
});

// Route to show form for creating a new category
router.get('/new', (req, res) => {
  res.render('categories/new');
});

// Route to create a new category
router.post('/new', async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  await category.save();
  res.redirect('/categories');
});

module.exports = router;
