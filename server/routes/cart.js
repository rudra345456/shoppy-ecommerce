const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name image price stock');

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    await cart.populate('items.product', 'name image price stock');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/:productId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: 'Item not found in cart',
      });
    }

    // Check stock
    const product = await Product.findById(req.params.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product', 'name image price stock');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate('items.product', 'name image price stock');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router; 