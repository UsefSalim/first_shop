const express = require('express');
const User = require('../models/user.models')
const authRoutes = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  updateController,
  getUsersController,
  deletUsersController
} = require('../controllers/auth.controllers');

const {authMiddleware} = require('../middlewares/auth.middlewares')

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.get('/logout', logoutController);
authRoutes.post('/update', authMiddleware(User, 'User'), updateController);
authRoutes.get('/users', authMiddleware(User, 'Admin'), getUsersController);
authRoutes.delete('/user/:_id', authMiddleware(User, 'Admin'), deletUsersController);

module.exports = authRoutes;
 