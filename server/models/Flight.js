const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Flight =
  sequelize.define("Flight", {

    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    arrivalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    availableSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "scheduled",
    },
  });

module.exports = Flight;