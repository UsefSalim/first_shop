const { ifExist} = require('xelor');
const Order = require('../models/Order.models');
const { OrderValidations } = require('../validations/Order.validations');
const ObjectID = require('mongoose').Types.ObjectId;

exports.addController = async (req, res) =>
{
  const currentUser = res.currentUser
  console.log(currentUser)
  // await xelor.add(req, res, Order, OrderValidations);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0)
  {
    return res.status(400).json('No order items')
  } else
  {
    const order = new Order({
      orderItems,
      user: currentUser._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    return res.status(201).json(createdOrder)
  }
};



exports.singleOrder = async (req, res) =>
{
  // const currentUser = res.currentUser
  const { _id } = req.params
  console.log(_id);
  if (_id && !ObjectID.isValid(_id))
    return res.status(400).json({ message: `l'ID ${_id} n'est pas valide` });
  const single = await Order.findOne({_id}).populate('user','name email')
  if (single) return res.status(200).json(single);
}