const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
    },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);
const Reviews = mongoose.model("Review", ReviewSchema);
module.exports = Reviews;
