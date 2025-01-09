const cloudinary = require("cloudinary");
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../Models/UserSchema");
const { jwtToken } = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
exports.Home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Chaitanya Tours and Travels",
  });
};

exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, image } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("Both password and confirmPassword are required", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords don't match", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "travel/users",
    width: 700,
    height: 700,
    crop: "scale",
  });

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud?.public_id,
      url: myCloud?.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    newUser,
  });
});

exports.logout = CatchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  //checking the password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  jwtToken("Login successful", 200, user, res);
  const message = `You have successfully logged in to Mysore International School Website`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Logged in to Chaitanya Tours and Travels successfully",
      message,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

exports.me = CatchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(new ErrorHandler("Please login", 401));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).select("+password");
  const oldPassword = req.body.oldPassword;
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Incorrect password", 401));
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        "New Password and confirm password are not the same",
        400
      )
    );
  }
  user.password = req.body.newPassword;
  await user.save();
  jwtToken("successfully updated your password", 200, user, res);
});

exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Email does not exist", 400));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/password/${resetToken}`;

  const message = `Your password reset token :- \n\n ${resetPasswordUrl} \n\n If You have not requested it then ,please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token",
      message,
    });

    res.status(200).json({
      success: true,
      message: `A link to reset your password has been sent to ${user.email}. Please make sure to check your inbox and spam `,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(e.message, 500));
  }
});

exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Invalid token or token has been expired", 400)
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  jwtToken("Successfully updated password", 200, user, res);
});
