const jwt = require("jsonwebtoken");
const User = require("./../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const dotenv = require("dotenv");
const { createSendToken } = require("./createSendTokenHandler");

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        data: {
          status: "fail",
          message: "Invalid email or password",
        },
      });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        data: {
          status: "fail",
          message: "Invalid email or password",
        },
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const protect = async (req, res, next) => {
  try {
    // console.log(req.headers);

    let token;
     if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in ! Please log in first ! ",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const userAuth = await User.findById(decoded.id);
    if (!userAuth) {
      return res.status(401).json({
        status: "fail",
        message: "User dosent exsist",
      });
    }
    req.user = userAuth;
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: "fail",
        message: "you dont have acess",
      });
    }
    next();
  };
};

module.exports = {
  signup,
  login,
  protect,
  restrict,
};
