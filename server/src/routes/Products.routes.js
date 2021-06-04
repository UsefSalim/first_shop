const express = require('express');

const productsRoutes = express.Router();
const {
  addController,
  getAllController,
  getOneController,
  deleteOneController,
  updateOneController,
  deletAllController,
} = require('../controllers/Products.controllers');

productsRoutes.get('/', getAllController);
productsRoutes.delete('/', deletAllController);
productsRoutes.post('/add', addController);
productsRoutes.get('/:_id', getOneController);
productsRoutes.delete('/:_id', deleteOneController);
productsRoutes.put('/:_id', updateOneController);

module.exports = productsRoutes;
