const express = require("express");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated");
const {
  getAllUsers,
  deleteUser,
  toggleAdminStatus,
} = require("../Models/AdminController");
const router = express.Router();

router.route("/users").get(isAuthenticatedUser, isAdmin, getAllUsers);
router
  .route("/user/:id")
  .delete(isAuthenticatedUser, isAdmin, deleteUser)
  .patch(isAuthenticatedUser, isAdmin, toggleAdminStatus);

module.exports = router;
