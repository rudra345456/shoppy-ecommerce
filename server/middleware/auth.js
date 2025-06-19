const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized to access this route',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          message: 'User not found',
        });
      }

      // Check if user is active
      if (user.status !== 'active') {
        return res.status(401).json({
          message: 'User account is inactive',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized to access this route',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check user role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Middleware to check if user owns the resource
exports.checkOwnership = (model) => async (req, res, next) => {
  try {
    const resource = await model.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }

    // Check if user is admin or owns the resource
    if (req.user.role !== 'admin' && resource.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to access this resource',
      });
    }

    req.resource = resource;
    next();
  } catch (error) {
    next(error);
  }
}; 