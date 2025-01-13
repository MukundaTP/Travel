const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    startLocation: {
      type: String,
      trim: true,
    },
    endLocation: {
      type: String,
      trim: true,
    },
    departureDate: {
      type: String,
      trim: true,
    },
    departureTime: {
      type: String,
      trim: true,
    },
    travelers: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactFormSchema);

module.exports = Contact;
