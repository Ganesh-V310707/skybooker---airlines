import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getFlights } from "../services/flightService";

function Flights() {

  const [search, setSearch] = useState("");

  const [flights, setFlights] = useState([]);

  useEffect(() => {

    fetchFlights();

  }, []);

  const fetchFlights = async () => {

    try {

      const data = await getFlights();

      setFlights(data);

    } catch (error) {

      console.log(error);
    }
  };

  const filteredFlights = flights.filter((flight) =>
    flight.route
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="px-5 md:px-16 py-12">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-10"
        >
          Explore Flights
        </motion.h1>

        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="text"
          placeholder="Search by Route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 p-4 mb-12 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 outline-none placeholder:text-gray-300"
        />

        {filteredFlights.length === 0 ? (

          <div className="text-center text-2xl text-gray-300 mt-20">
            No Flights Found
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredFlights.map((flight, index) => (

              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl"
              >

                <h2 className="text-3xl font-bold mb-4">
                  {flight.route}
                </h2>

                <p className="text-gray-300 mb-2">
                  Airline: {flight.airline}
                </p>

                <p className="text-gray-300 mb-2">
                  Departure: {flight.time}
                </p>

                <p className="text-gray-300 mb-2">
                  Total Seats: {flight.totalSeats}
                </p>

                <p className="text-gray-300 mb-2">
                  Booked Seats: {flight.bookedSeats}
                </p>

                <p className="text-gray-300 mb-5">
                  Available Seats: {flight.availableSeats}
                </p>

                <p className="text-3xl font-bold text-cyan-300 mb-6">
                  {flight.price}
                </p>

                {flight.availableSeats > 0 ? (

                  <Link
                    to="/booking"
                    state={{ flight }}
                  >

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold p-4 rounded-2xl transition"
                    >
                      Book Now
                    </motion.button>

                  </Link>

                ) : (

                  <button className="w-full bg-red-500 p-4 rounded-2xl font-bold cursor-not-allowed">
                    Sold Out
                  </button>

                )}

              </motion.div>

            ))}

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}

export default Flights;