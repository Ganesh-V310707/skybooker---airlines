const express = require("express");

const router = express.Router();

const Booking =
  require("../models/Booking");

const Flight =
  require("../models/Flight");

const User =
  require("../models/User");

router.get(
  "/user/:userId",

  async (req, res) => {

    try {

      const bookings =
        await Booking.findAll({

          where: {
            userId:
              req.params.userId,
          },

          include: [

            {
              model: Flight,
            },

            {
              model: User,

              attributes: [
                "id",
                "name",
                "email",
              ],
            },
          ],
        });

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/:flightId",

  async (req, res) => {

    try {

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
  }
);

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
          "pending",

        bookingStatus:
          "locked",

        lockExpiresAt:
          new Date(

            Date.now() +

            5 * 60 * 1000
          ),
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

      const flight =
        await Flight.findByPk(
          booking.flightId
        );

      if (flight) {

        const bookedSeats =
          await Booking.count({

            where: {

              flightId:
                flight.id,

              paymentStatus:
                "paid",
            },
          });

        await flight.update({

          bookedSeats,

          availableSeats:
            flight.totalSeats -
            bookedSeats,
        });
      }

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