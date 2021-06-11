const express = require('express');
const User = require('../models/user.models')

const orderRoutes = express.Router();
const {
  addController,
  singleOrder,
  updateOrderPayd,
  getUserOrder
} = require('../controllers/Order.controllers');
const { authMiddleware } = require('../middlewares/auth.middlewares')

orderRoutes.post('/add', authMiddleware(User, 'User'), addController);
orderRoutes.get('/myorders', authMiddleware(User, 'User'), getUserOrder);
orderRoutes.get('/:_id', authMiddleware(User, 'User'), singleOrder);
orderRoutes.put('/:id/pay', authMiddleware(User, 'User'), updateOrderPayd);


module.exports = orderRoutes;
