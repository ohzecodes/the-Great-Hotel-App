const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  forgotPassword,
  logout,
  resetPassword,
  // emailcode,
} = require("./controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/newpassword/:resetToken").put(resetPassword);

router.route("/logout").get(logout);

module.exports = router;
