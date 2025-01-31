const Contact = require("../Models/ContactSchema");
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");
const { sendEmail } = require("../utils/sendEmail");

// Create Contact Form Submission
exports.createContact = CatchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    startLocation,
    endLocation,
    departureDate,
    departureTime,
    travelers,
    message,
  } = req.body;

  // 1. Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !startLocation ||
    !endLocation ||
    !departureDate ||
    !departureTime ||
    !travelers
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // 2. Create contact entry
  const contact = await Contact.create({
    ...req.body,
    status: "pending",
  });

  // 3. Send confirmation email to user
  const userEmailMessage = `
Dear ${firstName} ${lastName},

Thank you for booking your journey with Car Travel & Tours. We have received your travel request and are excited to help you plan your trip.

Your Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Travel Route: ${startLocation} to ${endLocation}
- Departure Date: ${departureDate}
- Departure Time: ${departureTime}
- Number of Travelers: ${travelers}
- Booking Reference: ${contact._id}

Your Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Name: ${firstName} ${lastName}
- Phone: ${phone}
- Email: ${email}

${message ? `Additional Message: "${message}"` : ""}

What's Next?
━━━━━━━━━━━━━━━━━━
One of our travel specialists will review your request and contact you within the next 24 hours to:
- Confirm availability
- Discuss any special requirements
- Provide pricing details
- Answer any questions you may have

Need Immediate Assistance?
━━━━━━━━━━━━━━━━━━━━━━━━━
- Call us: ${process.env.COMPANY_PHONE}
- Email: ${process.env.COMPANY_EMAIL}
- Reference your booking ID: ${contact._id}

We're committed to making your journey comfortable and memorable.

Best regards,
Car Travel & Tours Team
`;

  try {
    await sendEmail({
      email: email,
      subject: "Travel Booking Confirmation - Car Travel & Tours",
      message: userEmailMessage,
    });
    console.log(`Confirmation email sent to user: ${email}`);
  } catch (error) {
    console.error(`Error sending confirmation email to user: ${error}`);
  }

  // 4. Send notification to admin
  const adminEmailMessage = `
NEW TRAVEL BOOKING REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS
───────────────
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}

JOURNEY DETAILS
──────────────
- Route: ${startLocation} → ${endLocation}
- Date: ${departureDate}
- Time: ${departureTime}
- Travelers: ${travelers}

${
  message
    ? `ADDITIONAL NOTES
───────────────
${message}`
    : ""
}

BOOKING INFORMATION
─────────────────
- Reference ID: ${contact._id}
- Status: Pending
- Submitted: ${new Date().toLocaleString()}

ACTION REQUIRED:
- Review booking details
- Check route availability
- Prepare pricing quote
- Contact customer within 24 hours

Access admin dashboard to process this booking:
${process.env.ADMIN_DASHBOARD_URL}/bookings/${contact._id}

-- Automated Booking Notification
Chaithanya Tours And Travels Booking System
`;

  try {
    await sendEmail({
      email: process.env.SMTP_EMAIL,
      subject: `New Travel Booking: ${startLocation} to ${endLocation}`,
      message: adminEmailMessage,
    });
    console.log(`Notification email sent to admin: ${process.env.SMTP_EMAIL}`);
  } catch (error) {
    console.error(`Error sending notification email to admin: ${error}`);
  }

  // 5. Send success response
  res.status(201).json({
    success: true,
    message:
      "Thank you for your booking request! We'll contact you within 24 hours to confirm your journey details.",
    bookingReference: contact._id,
  });
});

// Update Booking Status
exports.updateBookingStatus = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  contact.status = status;
  await contact.save();

  // Send status update email to customer
  const statusEmailMessage = `
Dear ${contact.firstName} ${contact.lastName},

Your booking status has been updated.

Booking Details:
━━━━━━━━━━━━━━━━
- Reference ID: ${contact._id}
- Route: ${contact.startLocation} to ${contact.endLocation}
- Date: ${contact.departureDate}
- Status: ${status.toUpperCase()}

${
  status === "confirmed"
    ? `
Next Steps:
- Please review the confirmed details
- Save your booking reference
- Contact us if you need to make any changes

Our team is ready to ensure you have a comfortable journey.
`
    : ""
}

${
  status === "cancelled"
    ? `
If you have any questions about the cancellation or would like to make a new booking, please don't hesitate to contact us.
`
    : ""
}

For any queries, please contact us:
- Phone: ${process.env.COMPANY_PHONE}
- Email: ${process.env.COMPANY_EMAIL}

Best regards,
Car Travel & Tours Team
`;

  await sendEmail({
    email: contact.email,
    subject: `Booking Status Update - ${status.toUpperCase()}`,
    message: statusEmailMessage,
  });

  res.status(200).json({
    success: true,
    message: "Booking status updated successfully",
    contact,
  });
});

// Additional helper function for auto-response outside business hours
const isBusinessHours = () => {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay();

  // Consider business hours as 9 AM to 5 PM, Monday (1) to Friday (5)
  return day >= 1 && day <= 5 && hours >= 9 && hours < 17;
};

// Create Newsletter Subscription
exports.subscribeNewsletter = CatchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  // Check if email already subscribed
  const existingSubscriber = await Newsletter.findOne({ email });
  if (existingSubscriber) {
    return res.status(400).json({
      success: false,
      message: "This email is already subscribed to our newsletter",
    });
  }

  // Create newsletter subscription
  await Newsletter.create({ email });

  // Send welcome email
  const welcomeMessage = `
Dear Subscriber,

Thank you for subscribing to the Car Travel & Tours newsletter! We're excited to have you join our community.

What to expect:
- Exclusive travel deals and packages
- Travel tips and destination guides
- Special seasonal offers
- Latest updates about our services
- Travel inspiration and stories

Stay tuned for our next newsletter. In the meantime, feel free to explore our services at our website.

If you have any questions, our team is always here to help!

Best regards,
Car Travel & Tours Team

Note: You can unsubscribe at any time by clicking the unsubscribe link in our newsletters.
`;

  await sendEmail({
    email: email,
    subject: "Welcome to Car Travel & Tours Newsletter!",
    message: welcomeMessage,
  });

  res.status(201).json({
    success: true,
    message: "Successfully subscribed to our newsletter!",
  });
});

// Get All Contacts
exports.getAllContacts = CatchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
});

// Delete Contact by ID
exports.deleteContact = CatchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Find the contact by ID
  const contact = await Contact.findById(id);

  // If contact not found, return error
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  // Delete the contact
  await Contact.deleteOne({ _id: id });

  // Send success response
  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});
