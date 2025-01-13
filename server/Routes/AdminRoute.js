const express = require("express");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated.js");
const {
  getAllUsers,
  deleteUser,
  toggleAdminStatus,
  getAllReviews,
  updateReview,
  deleteReview,
  getAllContactQueries,
  deleteContactQuery,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
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

router
  .route("/contact-queries")
  .get(isAuthenticatedUser, isAdmin, getAllContactQueries);

router
  .route("/contact-query/:id")
  .delete(isAuthenticatedUser, isAdmin, deleteContactQuery);
router
  .route("/team")
  .post(isAuthenticatedUser, isAdmin, createTeamMember)
  .get(getAllTeamMembers);

router
  .route("/team/:id")
  .get(isAuthenticatedUser, isAdmin, getSingleTeamMember)
  .put(isAuthenticatedUser, isAdmin, updateTeamMember)
  .delete(isAuthenticatedUser, isAdmin, deleteTeamMember);

module.exports = router;
