const { register, login, createToken } = require('xelor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

exports.registerController = async (req, res) => {
  const { email } = req.body;
  await register(req, res, User, registerValidations, { email });
};
exports.loginController = async (req, res) => {
  const { email } = req.body;
  await login(req, res, User, loginValidations, { email });
};
exports.updateController = async (req, res) => {
  const { email, password, name } = req.body;
  const currentMail = res.currentUser.email
  console.log(currentMail);
  const currentUser = await User.findOne({ email:currentMail });
  console.log(currentUser);
  if (currentUser) {
    currentUser.name = name || currentUser.name;
    currentUser.email = email || currentUser.email;
    currentUser.password =
      (await bcrypt.hash(password, 10)) || currentUser.password;
  
    const updatedUser = await currentUser.save();
    const token = createToken({ id: updatedUser._id, role: updatedUser.role })
    return res
      .status(200)
      .cookie('_token', token, {
        httpOnly: true,
        maxAge: process.env.JWT_EXPIRATION_TIME,
      })
      .json({ role: updatedUser.role, isAuthenticated: true, infoUser: updatedUser });
    
  }
};
exports.logoutController = (req, res) =>
  res
    .status(200)
    .clearCookie('_token')
    .json({ role: '', isAuthenticated: false });
