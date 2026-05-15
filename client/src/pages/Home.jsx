import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.68)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="flex flex-col justify-center items-center text-center px-5 min-h-[85vh]">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-extrabold mb-6"
        >
          SkyBooker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl max-w-3xl text-gray-200 mb-10"
        >
          Experience luxury airline booking with real-time reservations,
          premium travel management, and next-generation flight technology.
        </motion.p>

        <Link to="/flights">

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(34,211,238,0.55)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-10 py-5 rounded-2xl text-xl transition"
          >
            Explore Flights
          </motion.button>

        </Link>

      </div>

      <Footer />

    </div>
  );
}

export default Home;