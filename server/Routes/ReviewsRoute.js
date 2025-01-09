const express = require("express");
const {
  createReview,
  getAllReviews,
} = require("../controllers/ReviewController");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(getAllReviews);
router.route("/postReview").post(createReview);

module.exports = router;
