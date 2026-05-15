const express = require("express");

const router = express.Router();

const Flight = require("../models/Flight");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {

  try {

    const flights = await Flight.findAll();

    res.json(flights);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {

    try {

      const newFlight =
        await Flight.create(req.body);

      res.status(201).json({

        message: "Flight Added",

        flight: newFlight,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.delete(
  "/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {

    try {

      await Flight.destroy({

        where: {
          id: req.params.id,
        },
      });

      res.json({
        message: "Flight Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;