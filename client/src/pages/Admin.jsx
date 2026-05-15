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

  const [flights, setFlights] = useState([]);

  const [airline, setAirline] = useState("");
  const [route, setRoute] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  useEffect(() => {

    fetchFlights();

  }, []);

  const fetchFlights = async () => {

    try {

      const data = await getFlights();

      console.log(data);

      setFlights(data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load flights");
    }
  };

  const totalFlights = flights.length;

  const totalBookedSeats = flights.reduce(
    (acc, flight) => acc + Number(flight.bookedSeats || 0),
    0
  );

  const totalAvailableSeats = flights.reduce(
    (acc, flight) => acc + Number(flight.availableSeats || 0),
    0
  );

  const handleAddFlight = async () => {

    if (!airline || !route || !totalSeats) {

      toast.error("Fill all fields");

      return;
    }

    const newFlight = {
      airline,
      route,
      totalSeats: Number(totalSeats),
      bookedSeats: 0,
      availableSeats: Number(totalSeats),
      time: "10:00 AM",
      price: "₹5000",
    };

    try {

      await addFlight(newFlight);

      toast.success("Flight Added");

      fetchFlights();

      setAirline("");
      setRoute("");
      setTotalSeats("");

    } catch (error) {

      console.log(error);

      toast.error("Failed to add flight");
    }
  };

  const handleDeleteFlight = async (id) => {

    try {

      await deleteFlight(id);

      toast.success("Flight Deleted");

      fetchFlights();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete flight");
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

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          >

            <h2 className="text-gray-300 text-xl mb-3">
              Total Flights
            </h2>

            <p className="text-5xl font-bold">
              {totalFlights}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          >

            <h2 className="text-gray-300 text-xl mb-3">
              Booked Seats
            </h2>

            <p className="text-5xl font-bold">
              {totalBookedSeats}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          >

            <h2 className="text-gray-300 text-xl mb-3">
              Available Seats
            </h2>

            <p className="text-5xl font-bold">
              {totalAvailableSeats}
            </p>

          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl mb-12"
        >

          <h2 className="text-3xl font-bold mb-8">
            Add Flight
          </h2>

          <input
            type="text"
            placeholder="Airline Name"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full p-4 mb-5 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <input
            type="text"
            placeholder="Route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="w-full p-4 mb-5 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <input
            type="number"
            placeholder="Total Seats"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className="w-full p-4 mb-8 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <button
            onClick={handleAddFlight}
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-4 rounded-2xl"
          >
            Add Flight
          </button>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {flights.map((flight, index) => (

            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-7 rounded-3xl"
            >

              <h2 className="text-3xl font-bold mb-3">
                {flight.airline}
              </h2>

              <p className="text-gray-300 mb-2">
                {flight.route}
              </p>

              <p className="text-gray-300 mb-2">
                Total Seats: {flight.totalSeats}
              </p>

              <p className="text-gray-300 mb-2">
                Booked Seats: {flight.bookedSeats}
              </p>

              <p className="text-gray-300 mb-6">
                Available Seats: {flight.availableSeats}
              </p>

              <button
                onClick={() => handleDeleteFlight(flight.id)}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold"
              >
                Delete Flight
              </button>

            </motion.div>

          ))}

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Admin;