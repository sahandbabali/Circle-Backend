const express = require("express");
const router = express.Router();

// /api/auth - login user and get token - Public
router.post("/", (req, res) => {
  res.send("login user and get token");
});

// /api/auth - get logged in user - Private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

module.exports = router;
