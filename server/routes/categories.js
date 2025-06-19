const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Category = require('../models/Category');
const Product = require('../models/Product');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: 'Category already exists',
      });
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    // Check if new name conflicts with existing category
    if (name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          message: 'Category name already exists',
        });
      }
    }

    category.name = name;
    category.description = description;

    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    // Check if category has associated products
    const products = await Product.find({ category: req.params.id });
    if (products.length > 0) {
      return res.status(400).json({
        message: 'Cannot delete category with associated products',
      });
    }

    await category.remove();
    res.json({ message: 'Category removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router; 