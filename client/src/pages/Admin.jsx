import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import {
  getFlights,
  addFlight,
  deleteFlight,
} from "../services/flightService";

function Admin() {

  const [flights, setFlights] =
    useState([]);

  const [flightNumber, setFlightNumber] =
    useState("");

  const [airline, setAirline] =
    useState("");

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [departureTime, setDepartureTime] =
    useState("");

  const [arrivalTime, setArrivalTime] =
    useState("");

  const [gate, setGate] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [totalSeats, setTotalSeats] =
    useState("");

  useEffect(() => {

    fetchFlights();

  }, []);

  const fetchFlights = async () => {

    try {

      const data =
        await getFlights();

      setFlights(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load flights"
      );
    }
  };

  const totalFlights =
    flights.length;

  const totalBookedSeats =
    flights.reduce(

      (acc, flight) =>

        acc +
        Number(
          flight.bookedSeats || 0
        ),

      0
    );

  const totalAvailableSeats =
    flights.reduce(

      (acc, flight) =>

        acc +
        Number(
          flight.availableSeats || 0
        ),

      0
    );

  const handleAddFlight =
    async () => {

      if (

        !flightNumber ||
        !airline ||
        !origin ||
        !destination ||
        !departureTime ||
        !arrivalTime ||
        !gate ||
        !price ||
        !totalSeats

      ) {

        toast.error(
          "Fill all fields"
        );

        return;
      }

      const newFlight = {

        flightNumber,

        airline,

        origin,

        destination,

        route:
          `${origin} → ${destination}`,

        departureTime,

        arrivalTime,

        gate,

        totalSeats:
          Number(totalSeats),

        bookedSeats: 0,

        availableSeats:
          Number(totalSeats),

        price,
      };

      try {

        await addFlight(
          newFlight
        );

        toast.success(
          "Flight Added"
        );

        fetchFlights();

        setFlightNumber("");
        setAirline("");
        setOrigin("");
        setDestination("");
        setDepartureTime("");
        setArrivalTime("");
        setGate("");
        setPrice("");
        setTotalSeats("");

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add flight"
        );
      }
    };

  const handleDeleteFlight =
    async (id) => {

      try {

        await deleteFlight(id);

        toast.success(
          "Flight Deleted"
        );

        fetchFlights();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete flight"
        );
      }
    };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="px-5 md:px-16 py-12">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-12">

          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

          <Link to="/add-admin">

            <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-6 py-3 rounded-2xl">
              Add Admin
            </button>

          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-3">
              Total Flights
            </h2>

            <p className="text-5xl font-bold">
              {totalFlights}
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-3">
              Booked Seats
            </h2>

            <p className="text-5xl font-bold">
              {totalBookedSeats}
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl">
            <h2 className="text-xl mb-3">
              Available Seats
            </h2>

            <p className="text-5xl font-bold">
              {totalAvailableSeats}
            </p>
          </div>

        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl mb-12">

          <h2 className="text-3xl font-bold mb-8">
            Add Flight
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Flight Number"
              value={flightNumber}
              onChange={(e) =>
                setFlightNumber(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Airline"
              value={airline}
              onChange={(e) =>
                setAirline(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) =>
                setOrigin(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) =>
                setDestination(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Departure Time"
              value={departureTime}
              onChange={(e) =>
                setDepartureTime(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Arrival Time"
              value={arrivalTime}
              onChange={(e) =>
                setArrivalTime(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Gate"
              value={gate}
              onChange={(e) =>
                setGate(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

            <input
              type="number"
              placeholder="Total Seats"
              value={totalSeats}
              onChange={(e) =>
                setTotalSeats(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl bg-white/10"
            />

          </div>

          <button
            onClick={handleAddFlight}
            className="mt-8 bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-4 rounded-2xl"
          >
            Add Flight
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {flights.map((flight) => (

            <div
              key={flight.id}
              className="bg-white/10 p-7 rounded-3xl"
            >

              <h2 className="text-3xl font-bold mb-3">
                {flight.airline}
              </h2>

              <p className="mb-2">
                Flight:
                {" "}
                {flight.flightNumber}
              </p>

              <p className="mb-2">
                Route:
                {" "}
                {flight.route}
              </p>

              <p className="mb-2">
                Departure:
                {" "}
                {flight.departureTime}
              </p>

              <p className="mb-2">
                Arrival:
                {" "}
                {flight.arrivalTime}
              </p>

              <p className="mb-2">
                Gate:
                {" "}
                {flight.gate}
              </p>

              <p className="mb-2">
                Price:
                {" "}
                {flight.price}
              </p>

              <p className="mb-2">
                Seats:
                {" "}
                {flight.availableSeats}
                /
                {flight.totalSeats}
              </p>

              <button
                onClick={() =>
                  handleDeleteFlight(
                    flight.id
                  )
                }
                className="mt-5 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold"
              >
                Delete Flight
              </button>

            </div>
          ))}

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Admin;