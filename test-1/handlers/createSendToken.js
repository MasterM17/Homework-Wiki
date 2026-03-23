const jwt = require("jsonwebtoken");

exports.createSendToken = async (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    },
  );

 res.cookie("jwt", token, {
      exppires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
      ),
      secure: false,
      httpOnly: true,
    });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
