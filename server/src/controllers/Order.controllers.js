const xelor = require('xelor');
const Order = require('../models/Order.models');
const { OrderValidations } = require('../validations/Order.validations');

exports.addController = async (req, res) => {
  await xelor.add(req, res, Order, OrderValidations);
};

exports.getAllController = async (req, res) => {
  await xelor.getAll(res, Order);
};

exports.getOneController = async (req, res) => {
  const { _id } = req.params;
  await xelor.getOne(res, Order, { _id });
};

exports.deleteOneController = async (req, res) => {
  await xelor.deleteOne(req, res, Order);
};

exports.updateOneController = async (req, res) => {
  await xelor.update(req, res, Order, OrderValidations);
};

exports.deletAllController = async (req, res) => {
  await xelor.deleteAll(res, Order);
};
