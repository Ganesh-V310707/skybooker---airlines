const express = require("express");

const cors = require("cors");

require("dotenv").config();

const sequelize =
  require("./config/db");

const Flight =
  require("./models/Flight");

const User =
  require("./models/User");

const Booking =
  require("./models/Booking");

const flightRoutes =
  require("./routes/flightRoutes");

const bookingRoutes =
  require("./routes/bookingRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin:
      "https://skybooker-airlines-1.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

User.hasMany(Booking, {
  foreignKey: "userId",
});

Booking.belongsTo(User, {
  foreignKey: "userId",
});

Flight.hasMany(Booking, {
  foreignKey: "flightId",
});

Booking.belongsTo(Flight, {
  foreignKey: "flightId",
});

app.use(
  "/api/flights",
  flightRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.get("/", (req, res) => {

  res.send(
    "SkyBooker Backend Running"
  );
});

sequelize.sync()
  .then(() => {

    console.log(
      "PostgreSQL Connected"
    );

  })
  .catch((err) => {

    console.log(err);
  });

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});