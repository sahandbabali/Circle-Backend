const express = require("express");
const router = express.Router();

// /api/contacts - get all contacts - Private
router.get("/", (req, res) => {
  res.send("get all contacts");
});

// /api/contacts - add new contact - Private
router.post("/", (req, res) => {
  res.send("add new contact");
});

// /api/contacts - update contact - Private
router.put("/:id", (req, res) => {
  res.send("update contact");
});

// /api/contacts - delete contact - Private
router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
