const { User } = require("../../models/user");

const { createHash, compareHash } = require("../../helpers/hash");

exports.adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "Invalid User" });
    }
    const isMatch = await compareHash(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid User" });
    }

    const token = await user.generateAuthToken();
    res.send({ token, user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
