const cloudinary = require("cloudinary");
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../Models/UserSchema");
const { jwtToken } = require("../utils/jwtToken");
// const { sendEmail } = require("./sendEmail");

exports.Home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Mysore International School",
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
  //     const message = `You have successfully logged in to Mysore International School Website`;
  //     try {
  //       await sendEmail({
  //         email: user.email,
  //         subject: "Login to Mysore International School Website",
  //         message,
  //       });

  //     } catch (e) {
  //       return next(new ErrorHandler(e.message, 500));
  //     }
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
