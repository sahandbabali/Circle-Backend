const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

// /api/users - creates new user - Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Include a valid email").isEmail(),
    check("password", "Please enter pass over 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.send("User added successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
