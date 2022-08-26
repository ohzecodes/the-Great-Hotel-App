const express = require("express");
const router = express.Router();
const { getPrivateRoute, editUser } = require("./controllers/private");
const { protect } = require("./middleware/auth");

router.route("/").get(protect, getPrivateRoute);
// router.route("/edit/:id").post(protect, editUser);
module.exports = router;
