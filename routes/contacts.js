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
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newcontact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newcontact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// /api/contacts - update contact - Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  // build contact object
  const contactfields = {};
  if (name) {
    contactfields.name = name;
  }
  if (email) {
    contactfields.email = email;
  }
  if (phone) {
    contactfields.phone = phone;
  }
  if (type) {
    contactfields.type = type;
  }

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    // make sure user owns contact
    if (contact.user.toString() != req.user.id) {
      return res.status(404).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactfields,
      },
      {
        new: true,
      }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// /api/contacts - delete contact - Private
router.delete("/:id", auth, async (req, res) => {
  res.send("delete contact");
});

module.exports = router;
