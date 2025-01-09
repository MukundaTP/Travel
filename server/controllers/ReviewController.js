const Reviews = require("../Models/ReviewSchema");
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Create Review
exports.createReview = CatchAsyncErrors(async (req, res, next) => {
  // 1. Check if all required fields are present
  const { name, message, rating } = req.body;

  // 3. Handle avatar upload to cloudinary
  let avatarData = {};

  // Upload avatar to cloudinary
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "travel/reviews",
    width: 700,
    height: 700,
    crop: "scale",
  });

  avatarData = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  // 4. Create review with all data
  const review = await Reviews.create({
    name,
    message,
    rating,
    avatar: avatarData,
  });

  // 5. Send success response
  res.status(201).json({
    success: true,
    message: "Review created successfully",
    review,
  });
});

// Get All Reviews
exports.getAllReviews = CatchAsyncErrors(async (req, res, next) => {
  const reviews = await Reviews.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// Get Single Review
exports.getSingleReview = CatchAsyncErrors(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  res.status(200).json({
    success: true,
    review,
  });
});

// Update Review
exports.updateReview = CatchAsyncErrors(async (req, res, next) => {
  let review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Handle avatar update if provided
  if (req.body.avatar) {
    // Delete old avatar
    await cloudinary.v2.uploader.destroy(review.avatar.public_id);

    // Upload new avatar
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "reviews",
      width: 150,
      crop: "scale",
    });

    req.body.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // Update review
  review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});

// Delete Review
exports.deleteReview = CatchAsyncErrors(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Delete avatar from cloudinary
  if (review.avatar.public_id !== "reviews/default_avatar") {
    await cloudinary.v2.uploader.destroy(review.avatar.public_id);
  }

  // Delete review
  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// Get Review Statistics
exports.getReviewStats = CatchAsyncErrors(async (req, res, next) => {
  const stats = await Reviews.aggregate([
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratings: {
          $push: "$rating",
        },
      },
    },
    {
      $addFields: {
        ratingCounts: {
          $reduce: {
            input: "$ratings",
            initialValue: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            in: {
              $mergeObjects: [
                "$$value",
                {
                  ["$$this"]: {
                    $add: [
                      {
                        $getField: {
                          field: { $toString: "$$this" },
                          input: "$$value",
                        },
                      },
                      1,
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        avgRating: { $round: ["$avgRating", 1] },
        totalReviews: 1,
        ratingCounts: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    stats: stats[0] || {
      avgRating: 0,
      totalReviews: 0,
      ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    },
  });
});
