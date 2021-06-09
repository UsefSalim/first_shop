const express = require('express');
const User = require('../models/user.models')

const orderRoutes = express.Router();
const {
  addController,
  singleOrder
} = require('../controllers/Order.controllers');
const { authMiddleware } = require('../middlewares/auth.middlewares')

orderRoutes.post('/add', authMiddleware(User, 'User'), addController);
orderRoutes.get('/:_id', authMiddleware(User, 'User'), singleOrder);


module.exports = orderRoutes;
