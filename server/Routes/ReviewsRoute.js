const express = require("express");
const {
  getAllReviews,
  createOrUpdateReview,
} = require("../controllers/ReviewController");
const {
  isAuthenticatedUser,
  isAdmin,
} = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(getAllReviews);
router.route("/postReview").post(createOrUpdateReview);

module.exports = router;