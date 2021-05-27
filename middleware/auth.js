const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check for token existence
  if (!token) {
    return res.status(401).json({ msg: "no token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: "token is not valid" });
  }
};
