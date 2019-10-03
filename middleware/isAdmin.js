const isAdmin = async (req, res, next) => {
  const admin = req.user.isAdmin;

  if (!admin) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

module.exports = isAdmin;
