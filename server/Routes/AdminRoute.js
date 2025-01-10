const express = require("express");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated");
const {
  getAllUsers,
  deleteUser,
  toggleAdminStatus,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../Models/AdminController");
const router = express.Router();

router.route("/users").get(isAuthenticatedUser, isAdmin, getAllUsers);
router
  .route("/user/:id")
  .delete(isAuthenticatedUser, isAdmin, deleteUser)
  .patch(isAuthenticatedUser, isAdmin, toggleAdminStatus);
router.route("/reviews").get(isAuthenticatedUser, isAdmin, getAllReviews);

router
  .route("/review/:id")
  .patch(isAuthenticatedUser, isAdmin, updateReview)
  .delete(isAuthenticatedUser, isAdmin, deleteReview);

module.exports = router;
