const express = require("express");
const {
  registerUser,
  loginUser,
  Home,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateProfilePic,
} = require("../controllers/UserController");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated.js");
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
router.route("/updateProfilePicture").patch(updateProfilePic);

module.exports = router;
