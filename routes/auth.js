const express = require("express");
const router = express.Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");

const auth = require("../middleware/auth");
// /api/auth - login user and get token - Public
router.post(
  "/",
  [
    check("email", "Include a valid email").isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    // express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
      //jwt
      const jwtpayload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        jwtpayload,
        config.get("jwtsecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// /api/auth - get logged in user - Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
