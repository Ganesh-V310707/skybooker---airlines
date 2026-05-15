const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");

const Flight = require("../models/Flight");

router.get("/:flightId", async (req, res) => {

  try {

    const now = new Date();

    await Booking.destroy({

      where: {

        flightId:
          req.params.flightId,

        paymentStatus:
          "pending",
      },
    });

    const bookings =
      await Booking.findAll({

        where: {
          flightId:
            req.params.flightId,
        },
      });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {

  try {

    const flight =
      await Flight.findByPk(

        req.body.flightId
      );

    if (!flight) {

      return res.status(404).json({
        message:
          "Flight not found",
      });
    }

    const existingSeat =
      await Booking.findOne({

        where: {

          flightId:
            req.body.flightId,

          seatNumber:
            req.body.seatNumber,
        },
      });

    if (existingSeat) {

      return res.status(400).json({
        message:
          "Seat already booked",
      });
    }

    const booking =
      await Booking.create({

        ...req.body,

        paymentStatus:
          "paid",

        bookingStatus:
          "confirmed",

        lockExpiresAt:
          new Date(

            Date.now() +

            5 * 60 * 1000
          ),
      });

    const bookedSeats =
      await Booking.count({

        where: {
          flightId:
            flight.id,
        },
      });

    await flight.update({

      bookedSeats,

      availableSeats:
        flight.totalSeats -
        bookedSeats,
    });

    res.status(201).json(
      booking
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.put(
  "/confirm/:bookingId",

  async (req, res) => {

    try {

      const booking =
        await Booking.findByPk(

          req.params.bookingId
        );

      if (!booking) {

        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      await booking.update({

        paymentStatus:
          "paid",

        bookingStatus:
          "confirmed",
      });

      res.json({

        message:
          "Booking Confirmed",

        booking,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;