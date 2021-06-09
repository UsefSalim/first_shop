const express = require('express');
const User = require('../models/user.models')
const authRoutes = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  updateController
} = require('../controllers/auth.controllers');

const {authMiddleware} = require('../middlewares/auth.middlewares')

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/update', authMiddleware(User, 'User'), updateController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;
 