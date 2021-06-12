const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.auth = async (req, res, next) => {
  const token = req.cookies._token;

  if (!token) return res.status(400).json({ role: '', isAuthenticated: false });
  jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) =>
  {
    console.log(err,decodedToken);
    if (err)
      return res
        .clearCookie('_token')
        .json({ role: '', isAuthenticated: false });
    if (
      decodedToken.data.role === res.Role1 ||
      decodedToken.data.role === res.Role2
    ) {
      res.currentUser = await res.Model.findOne({
        _id: decodedToken.data.id,
      }).select('-password');
      next();
    }
    // return res.status(400).json({ role: '', isAuthenticated: false })
  });
};

exports.authMiddleware = (Model, Role1, Role2 = null) => async (
  req,
  res,
  next
) =>
{
  res.Role1 = Role1;
  res.Role2 = Role2;
  res.Model = Model;
  await this.auth(req, res, next);
};


exports.verifIsAuthenticated = (req, res) => {
  const token = req.cookies._token;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        return res
          .status(200)
          .clearCookie('_token')
          .json('private root need login');
      } else {
        const infoUser = await User.findOne({
          _id: decodedToken.data.id,
        }).select('-password');
        return res
          .status(200)
          .json({
            role: decodedToken.data.role,
            isAuthenticated: true,
            infoUser,
          });
      }
    });
  } else {
    return res.status(200).json({ role: '', isAuthenticated: false });
  }
};
