const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

//middleware to authenticate user

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  const jwtSecret = process.env.jwt;

  if (!token) {
    return res
      .status(401)
      .send({ message: "Not authenticated. Auth token missing." });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findOne({ _id: payload._id });
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Not Authenticated" });
  }
};

module.exports = auth;
