const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({

        where: { email },
      });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({

      where: { email },
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(

      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.put(
  "/make-admin/:email",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findOne({

          where: {
            email:
              req.params.email,
          },
        });

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });
      }

      await user.update({

        role: "admin",
      });

      res.json({

        message:
          "User promoted to admin",

        user,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;