import { useEffect, useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getBookings,
  createBooking,
} from "../services/bookingService";

function Booking() {

  const navigate = useNavigate();

  const location = useLocation();

  const flight = location.state?.flight;

  const [name, setName] =
    useState("");

  const [selectedSeat, setSelectedSeat] =
    useState(null);

  const [bookedSeats, setBookedSeats] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const data =
        await getBookings(
          flight.id
        );

      const seats =
        data.map(

          (booking) =>
            booking.seatNumber
        );

      setBookedSeats(seats);

    } catch (error) {

      console.log(error);
    }
  };

 const seats =
  Array.from(

    {
      length:
        flight.totalSeats,
    },

    (_, index) => {

      return `S${index + 1}`;
    }
  );

  const handleBooking =
    async () => {

      if (
        !name ||
        !selectedSeat
      ) {

        toast.error(
          "Fill all details"
        );

        return;
      }

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            )
          );

        const booking =
          await createBooking({

            passengerName: name,

            seatNumber:
              selectedSeat,

            flightId:
              flight.id,

            userId:
              user.id,
          });

        localStorage.setItem(

          "ticket",

          JSON.stringify({

            passenger: name,

            seat:
              selectedSeat,

            route:
              flight.route,

            airline:
              flight.airline,
          })
        );

        toast.success(

          `Seat ${selectedSeat} locked`
        );

        navigate(

          "/payment",

          {
            state: {
              booking,
            },
          }
        );

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data?.message ||

          "Booking Failed"
        );
      }
    };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-16">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          <h1 className="text-5xl font-bold mb-3">
            Flight Booking
          </h1>

          <p className="text-gray-300 mb-10 text-xl">
            {flight?.route}
          </p>

          <input
            type="text"
            placeholder="Passenger Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full p-4 mb-10 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-300"
          />

          <h2 className="text-3xl font-bold mb-8">
            Select Your Seat
          </h2>

          <div className="grid grid-cols-4 gap-5 mb-10">

            {seats.map((seat) => {

              const isBooked =
                bookedSeats.includes(
                  seat
                );

              const isSelected =
                selectedSeat ===
                seat;

              return (

                <motion.button
                  whileHover={
                    !isBooked
                      ? {
                          scale: 1.08,
                        }
                      : {}
                  }
                  whileTap={
                    !isBooked
                      ? {
                          scale: 0.95,
                        }
                      : {}
                  }
                  key={seat}
                  disabled={isBooked}
                  onClick={() =>
                    setSelectedSeat(
                      seat
                    )
                  }
                  className={`
                    p-5 rounded-2xl font-bold text-lg transition
                    ${
                      isBooked
                        ? "bg-red-500 cursor-not-allowed"
                        : isSelected
                        ? "bg-cyan-400 text-black"
                        : "bg-white/10 hover:bg-white/20"
                    }
                  `}
                >
                  {seat}
                </motion.button>

              );
            })}

          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleBooking}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold p-4 rounded-2xl text-xl transition"
          >
            Continue To Payment
          </motion.button>

        </motion.div>

      </div>

      <Footer />

    </div>
  );
}

export default Booking;