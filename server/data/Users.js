const bcrypt = require("bcryptjs");

const Users = [
  {
    name: "Jason",
    email: "admin@shopperz.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: true,
  },
  {
    name: "Jason",
    email: "user@shopperz.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: false,
  },
];

module.exports = Users;
