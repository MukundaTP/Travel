const Contact = require("../Models/ContactSchema");
const CatchAsyncErrors = require("../utils/CatchAsyncErrors");

// Create Contact
exports.createContact = CatchAsyncErrors(async (req, res, next) => {
  await Contact.create(req.body);

  res.status(201).json({
    success: true,
    message: "Query submitted successfully, We will get back to you soon",
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
