const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/ContactController");
const router = express.Router();

router.route("/").get(getAllContacts);
router.route("/contactQueries").post(createContact);
router.route("/:id").delete(deleteContact);

module.exports = router;
