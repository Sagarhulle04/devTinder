const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is invalid!!");
    }

    const cookie = await jwt.verify(token, process.env.private_key);

    const { _id } = cookie;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = userAuth;
