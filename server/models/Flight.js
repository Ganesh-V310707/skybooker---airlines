const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Flight =
  sequelize.define("Flight", {

    airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    route: {
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

    time: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.STRING,
    },
  });

module.exports = Flight;