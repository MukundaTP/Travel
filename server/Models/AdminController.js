const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Reviews = require("./ReviewSchema");
const User = require("./UserSchema");
const cloudinary = require("cloudinary");

exports.getAllUsers = CatchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});

exports.deleteUser = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);

  // Check if ID is valid
  if (!id) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  // Find user first to check if exists and verify role
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Prevent changing own admin status
  if (user._id.toString() === req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete your own data", 403));
  }

  // Check if trying to delete admin
  if (user.isAdmin) {
    return next(new ErrorHandler("Admin user cannot be deleted", 403));
  }

  // Delete user's avatar from Cloudinary if it exists
  if (user.avatar && user.avatar.public_id) {
    try {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    } catch (error) {
      console.log("Error deleting avatar from Cloudinary:", error);
      // Continue with user deletion even if Cloudinary deletion fails
    }
  }

  // Delete any other associated photos if they exist
  if (user.photos && user.photos.length > 0) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  // Delete the user using deleteOne
  const result = await User.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return next(new ErrorHandler("Failed to delete user", 500));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.toggleAdminStatus = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!id) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  // Find user and check if exists
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Prevent changing own admin status
  if (user._id.toString() === req.user._id.toString()) {
    return next(
      new ErrorHandler("You cannot change your own admin status", 403)
    );
  }

  // Toggle the admin status
  user.isAdmin = req.body.isAdmin;

  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    message: `User admin status ${
      user.role ? "enabled" : "disabled"
    } successfully`,
    user,
  });
});

// Get all reviews
exports.getAllReviews = CatchAsyncErrors(async (req, res, next) => {
  const reviews = await Reviews.find().sort({ createdAt: -1 }); // Sort by newest first

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// Update review message
exports.updateReview = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;

  // Validate inputs
  if (!id) {
    return next(new ErrorHandler("Review ID is required", 400));
  }

  if (!message || message.trim().length === 0) {
    return next(new ErrorHandler("Message is required", 400));
  }

  // Find review and update
  const review = await Reviews.findById(id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Update message
  review.message = message;
  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

// Delete review
exports.deleteReview = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Review ID is required", 400));
  }

  // Find review
  const review = await Reviews.findById(id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Delete associated avatar from cloudinary if exists
  if (review.avatar && review.avatar.public_id) {
    await cloudinary.uploader.destroy(review.avatar.public_id);
  }

  // Delete review
  await Reviews.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
