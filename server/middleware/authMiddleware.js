// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to gain access.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentAdmin = await Admin.findById(decoded.id);

    if (!currentAdmin) {
      return next(new AppError('The administrator account for this token no longer exists.', 401));
    }

    req.admin = currentAdmin;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired authentication token.', 401));
  }
});

module.exports = { protect };