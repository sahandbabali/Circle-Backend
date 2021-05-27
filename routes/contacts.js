const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const User = require("../models/User");

const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// /api/contacts - get all contacts - Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// /api/contacts - add new contact - Private
router.post("/", auth, (req, res) => {
  res.send("add new contact");
});

// /api/contacts - update contact - Private
router.put("/:id", auth, (req, res) => {
  res.send("update contact");
});

// /api/contacts - delete contact - Private
router.delete("/:id", auth, (req, res) => {
  res.send("delete contact");
});

module.exports = router;
