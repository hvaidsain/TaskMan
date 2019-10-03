const bcrypt = require("bcrypt");

//used for hashing passwords
const createHash = async password => {
  return bcrypt.hash(password, 10);
};

//used for comparing hashed passwords

const compareHash = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { createHash, compareHash };
