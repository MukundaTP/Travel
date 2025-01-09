const express = require("express");
const {
  createContact,
  getAllContacts,
} = require("../controllers/ContactController");
const router = express.Router();

router.route("/").get(getAllContacts);
router.route("/contactQueries").post(createContact);

module.exports = router;
