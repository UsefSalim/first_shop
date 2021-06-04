const express = require('express');

const orderRoutes = express.Router();
const {
  addController,
  getAllController,
  getOneController,
  deleteOneController,
  updateOneController,
  deletAllController,
} = require('../controllers/Order.controllers');

orderRoutes.get('/', getAllController);
orderRoutes.delete('/', deletAllController);
orderRoutes.post('/add', addController);
orderRoutes.get('/:_id', getOneController);
orderRoutes.delete('/:_id', deleteOneController);
orderRoutes.put('/:_id', updateOneController);

module.exports = orderRoutes;
