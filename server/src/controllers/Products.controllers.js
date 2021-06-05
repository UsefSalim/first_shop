const xelor = require('xelor');
const Products = require('../models/Products.models');
const { ProductsValidations } = require('../validations/Products.validations');

exports.addController = async (req, res) => {
  await xelor.add(req, res, Products, ProductsValidations);
};

exports.getAllController = async (req, res) => {
  await xelor.getAll(res, Products);
};

exports.getOneController = async (req, res) => {
  const { _id } = req.params;
  await xelor.getOne(res, Products, { _id });
};

exports.deleteOneController = async (req, res) => {
  await xelor.deleteOne(req, res, Products);
};

exports.updateOneController = async (req, res) => {
  await xelor.update(req, res, Products, ProductsValidations);
};

exports.deletAllController = async (req, res) => {
  await xelor.deleteAll(res, Products);
};
