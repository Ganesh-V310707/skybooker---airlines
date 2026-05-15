const jwt = require("jsonwebtoken");

const authMiddleware =
  (req, res, next) => {

    try {

      const token =
        req.headers.authorization;

      if (!token) {

        return res.status(401).json({
          message: "No Token",
        });
      }

      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET
        );

      req.user = decoded;

      next();

    } catch (error) {

      res.status(401).json({
        message: "Invalid Token",
      });
    }
  };

const adminMiddleware =
  (req, res, next) => {

    if (
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        message:
          "Admin Access Only",
      });
    }

    next();
  };

module.exports = {

  authMiddleware,

  adminMiddleware,
};