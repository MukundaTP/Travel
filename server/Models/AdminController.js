const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("./UserSchema");

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
