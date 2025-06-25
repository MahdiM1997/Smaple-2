const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkEmail, checkPassword } = require("../middlewares/checkInputs");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signin", checkEmail, checkPassword, usersController.signIn);

router.get("/checkifloggedin", verifyToken, usersController.checkifloggedin);

// this error route must be at the end
router.use((err, req, res, next) => {
  // if there is error thrown from any middlewares such as checkEmail,checkPassword,checkPhoneNumber... this middleware runs and we see the error from the backend, if you just display err, we get the stack trace(where the error is coming from) and if you do err.message,we get the exact error
  console.log("from users route middleware", err.message);
});
//always check the input data coming from user due to security reasons.
module.exports = router;
