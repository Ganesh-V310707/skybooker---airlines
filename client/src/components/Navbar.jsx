import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  logoutUser,
} from "../services/authService";

function Navbar() {

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const role =
    localStorage.getItem("role");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = () => {

    logoutUser();

    navigate(
      "/login",
      { replace: true }
    );
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 px-6 md:px-12 py-5 text-white"
    >

      <div className="flex flex-col md:flex-row justify-between items-center">

        <Link to="/">

          <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent">
            SkyBooker
          </h1>

        </Link>

        <div className="flex flex-wrap justify-center items-center gap-5 mt-5 md:mt-0 text-lg">

          <Link
            to="/"
            className="hover:text-cyan-200 transition"
          >
            Home
          </Link>

          <Link
            to="/flights"
            className="hover:text-cyan-200 transition"
          >
            Flights
          </Link>

          {!isLoggedIn && (

            <>

              <Link
                to="/login"
                className="hover:text-cyan-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-cyan-200 transition"
              >
                Sign Up
              </Link>

            </>
          )}

          {role === "admin" && (

            <Link
              to="/admin"
              className="hover:text-cyan-200 transition"
            >
              Admin Panel
            </Link>
          )}

          {isLoggedIn && role === "user" && (

            <Link
              to="/profile"
              className="hover:text-cyan-200 transition"
            >
              {user?.name || "Profile"}
            </Link>
          )}

          {isLoggedIn && (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </motion.nav>
  );
}

export default Navbar;