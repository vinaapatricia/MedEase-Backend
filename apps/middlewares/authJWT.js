const jwt = require("jsonwebtoken");
const User = require("../models/mongo/user");

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    try {
      const decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.API_SECRET
      );
      const user = await User.findOne({ _id: decoded.id }).exec();
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }
      req.user = user;
      next();
    } catch (error) {
      req.user = undefined;
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
