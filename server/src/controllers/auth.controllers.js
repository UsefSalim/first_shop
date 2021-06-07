const { register, login, createToken, ifExist} = require('xelor');
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
  const currentUser = await User.findOne({ email: currentMail });
  if (email !== currentMail)
  {
    const mailExist = await ifExist(User, { email })
    if (mailExist) return res.status(400).json("mail existant")
  }
  if (currentUser) {
    currentUser.name = name || currentUser.name;
    currentUser.email = email || currentUser.email;
    currentUser.password =
      (await bcrypt.hash(password, 10)) || currentUser.password;
  
    const updatedUser = await currentUser.save();
    const token = createToken({ id: currentUser._id, role: currentUser.role })
    return res
      .status(200)
      .json({message:"user Updated"});
    
  }
};
exports.logoutController = (req, res) =>
  res
    .status(200)
    .clearCookie('_token')
    .json({ role: '', isAuthenticated: false });
