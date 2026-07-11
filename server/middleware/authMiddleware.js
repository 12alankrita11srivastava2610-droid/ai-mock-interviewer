const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      req.user = decoded;

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    console.log("NO TOKEN RECEIVED");

    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protect };