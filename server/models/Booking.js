const { DataTypes } = require("sequelize");

const sequelize =
  require("../config/db");

const Booking =
  sequelize.define("Booking", {

    passengerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },

    bookingStatus: {
      type: DataTypes.STRING,
      defaultValue: "locked",
    },

    lockExpiresAt: {
      type: DataTypes.DATE,
    },
  });

module.exports = Booking;