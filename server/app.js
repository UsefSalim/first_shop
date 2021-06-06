require('express-async-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const { verifIsAuthenticated } = require('./src/middlewares/auth.middlewares');
const error = require('./src/middlewares/errors.middleware');

const authRoutes = require('./src/routes/auth.routes');
const productsRoutes = require('./src/routes/Products.routes');
const orderRoutes = require('./src/routes/Order.routes');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  }
);
module.exports = (app) => {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.get('env') === 'development' &&
    app.use(morgan('combined', { stream: accessLogStream }));
  // Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/products', productsRoutes);
  app.use('/api/v1/order', orderRoutes);
  app.use('/api/v1/ifauth', verifIsAuthenticated);
  app.use(error);
};
