const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortObj = { price: 1 };
          break;
        case 'price_desc':
          sortObj = { price: -1 };
          break;
        case 'newest':
          sortObj = { createdAt: -1 };
          break;
        default:
          sortObj = { createdAt: -1 };
      }
    }

    const products = await Product.find(query)
      .sort(sortObj)
      .populate('category', 'name');

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sort } = req.query;
    let searchQuery = {};

    // Search by name or description
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category && category !== 'all') {
      searchQuery.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortObj = { price: 1 };
          break;
        case 'price_desc':
          sortObj = { price: -1 };
          break;
        case 'newest':
          sortObj = { createdAt: -1 };
          break;
        default:
          sortObj = { createdAt: -1 };
      }
    }

    const products = await Product.find(searchQuery)
      .sort(sortObj)
      .populate('category', 'name');

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name');

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        stock,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
      .populate('category', 'name');

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router; 