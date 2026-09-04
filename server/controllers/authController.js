// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { signToken } = require('../utils/jwtUtils');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  console.log('--- Login Attempt ---');
  console.log('Entered Username:', username);

  if (!username || !password) {
    return next(new AppError('Please provide both username/email and password.', 400));
  }

  const admin = await Admin.findByUsernameOrEmail(username);
  console.log('Admin found in DB:', admin ? admin.username : 'NO USER FOUND');

  if (!admin) {
    return next(new AppError('Invalid administrator credentials (user not found)', 401));
  }

  const isMatch = await bcrypt.compare(password.trim(), admin.password_hash);
  console.log('Password Match Result:', isMatch);

  if (!isMatch) {
    return next(new AppError('Invalid administrator credentials (wrong password)', 401));
  }

  const token = signToken(admin.id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    },
  });
});

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      admin: req.admin,
    },
  });
});