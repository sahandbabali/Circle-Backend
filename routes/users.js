const express = require("express");
const router = express.Router();

// /api/users - creates new user - Public
router.post("/", (req, res) => {
  res.send("creates new user");
});

module.exports = router;
