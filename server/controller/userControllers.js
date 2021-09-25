const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../generateToken");

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid Email or Password" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const registeredUser = await user.save();
    res.send({
      _id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      isAdmin: registeredUser.isAdmin,
      token: generateToken(registeredUser),
    });
    res.status(401).json({ message: "Invalid Email or Password" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signIn,
  registerUser,
};
