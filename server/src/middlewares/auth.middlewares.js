const { auth } = require('xelor');
const jwt = require('jsonwebtoken')

exports.authMiddleware = (Role, Model) => async (req, res, next) => {
  res.Role = Role;
  res.Model = Model;
  await auth(req, res, next);
};


exports.verifIsAuthenticated = (req, res) =>
{
  const token = req.cookies._token;
  console.log(token);
  if (token)
  {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) =>
    {
      if (err)
      {
        return res.status(200).clearCookie('_token').json('private root need login');
      } else
      {
        return res
          .status(200)
          .json({ role: decodedToken.data.role, isAuthenticated: true });
      }
    });
  } else
  {
    console.log('rrrrrrrrrrrrrrrrrrrrrrr');
   return res.status(200).json({ role: '', isAuthenticated: false });
  }
}
