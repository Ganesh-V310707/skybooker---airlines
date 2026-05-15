import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  loginUser,
} from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      const data =
        await loginUser({

          email,
          password,
        });

      toast.success(
        "Login Successful"
      );

      if (
        data.user.role === "admin"
      ) {

        navigate(
          "/admin",
          { replace: true }
        );

      } else {

        navigate(
          "/flights",
          { replace: true }
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Login Failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="flex justify-center items-center px-5 py-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          <h2 className="text-4xl font-bold text-center mb-3">
            Welcome Back
          </h2>

          <p className="text-center text-gray-300 mb-10">
            Login to continue your flight journey
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 mb-5 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-300 focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 mb-8 rounded-2xl bg-white/10 border border-white/10 outline-none placeholder:text-gray-300 focus:border-blue-400"
          />

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-2xl text-lg font-semibold transition"
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="w-full mt-5 border border-white/20 hover:bg-white/10 p-4 rounded-2xl text-lg transition"
          >
            Continue with Google
          </motion.button>

        </motion.div>

      </div>

      <Footer />

    </div>
  );
}

export default Login;