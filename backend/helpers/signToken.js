let jwt = require("jsonwebtoken");
function signToken(payload) {
  const token = jwt.sign(payload, process.env.secret, { expiresIn: "1h" });
  // h stands for hour,e.g: 1h stands for 1 hour, m stands for minutes. and the Date for exp is UTC timezone
  //   fro security purpose we dont use the secret key directly here
  return token;
}
module.exports = signToken;
