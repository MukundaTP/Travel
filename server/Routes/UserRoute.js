const express = require("express");
const {
  registerUser,
  loginUser,
  Home,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logout);
router
  .route("/updatePassword")
  .put(isAuthenticatedUser, isAdmin, updatePassword);
router.route("/forgotPassword").put(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);

module.exports = router;
