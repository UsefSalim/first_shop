/* eslint-disable no-underscore-dangle */
require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./src/models/user.models');
const Product = require('./src/models/Products.models');
const connectDb = require('./config/db.config');
const Order = require('./src/models/Order.models');

connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const samplProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(samplProducts);
    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? destroyData() : importData();
