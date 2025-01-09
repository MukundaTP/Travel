const express = require("express");
const {
  registerUser,
  loginUser,
  Home,
  logout,
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logout);

module.exports = router;
