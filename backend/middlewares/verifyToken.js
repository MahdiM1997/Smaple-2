const jwt = require("jsonwebtoken");
// Middleware function to check and verify JWT token

function verifyToken(req, res, next) {
  // Get the JWT token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "unauthorized - no token provided",
      status: 401,
    });
    // here we could use our returnStatus too
  }

  // Verify the JWT ,remember user passes JWT in the  Authorization: `Bearer ${token}`,
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "unauthorized - Invalid token",
        status: 401,
      });
    }

    // Token is valid, attach the 'decoded' payload to the request object, it will have something like:  email: 'admin@medicalport.com', iat: 1709583185, exp: 1709586785 }
    req.decodedtoken = decoded;
    next();
  });
}
module.exports = verifyToken;
