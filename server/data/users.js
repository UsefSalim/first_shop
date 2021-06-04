const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Admin',
    email: 'admin@exemple.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'Admin',
  },
  {
    name: 'User1',
    email: 'user@exemple.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'User',
  },
  {
    name: 'User2',
    email: 'user2@exemple.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'User',
  },
];

module.exports = users;
