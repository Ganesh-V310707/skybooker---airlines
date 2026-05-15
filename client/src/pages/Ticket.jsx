import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

function Ticket() {

  const ticket = JSON.parse(
    localStorage.getItem("ticket")
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="flex justify-center items-center px-5 py-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >

          <div className="bg-cyan-400 text-black p-6">

            <h1 className="text-4xl font-extrabold">
              Boarding Pass
            </h1>

            <p className="text-lg font-semibold mt-2">
              SkyBooker Airlines
            </p>

          </div>

          <div className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div>
                <p className="text-gray-300 mb-2">
                  Passenger
                </p>

                <h2 className="text-2xl font-bold">
                  {ticket?.passenger}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 mb-2">
                  Seat Number
                </p>

                <h2 className="text-2xl font-bold">
                  {ticket?.seat}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 mb-2">
                  Airline
                </p>

                <h2 className="text-2xl font-bold">
                  {ticket?.airline}
                </h2>
              </div>

              <div>
                <p className="text-gray-300 mb-2">
                  Route
                </p>

                <h2 className="text-2xl font-bold">
                  {ticket?.route}
                </h2>
              </div>

            </div>

            <div className="border-t border-dashed border-white/20 my-10"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-5">

              <div>

                <p className="text-gray-300">
                  Boarding Time
                </p>

                <h2 className="text-3xl font-bold">
                  09:30 AM
                </h2>

              </div>

              <div>

                <p className="text-gray-300">
                  Gate
                </p>

                <h2 className="text-3xl font-bold">
                  A12
                </h2>

              </div>

              <div>

                <p className="text-gray-300">
                  Class
                </p>

                <h2 className="text-3xl font-bold">
                  Economy
                </h2>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      <Footer />

    </div>
  );
}

export default Ticket;