 import { useState } from "react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import {
  makeAdmin,
} from "../services/authService";

function AddAdmin() {

  const [email, setEmail] =
    useState("");

  const handleAddAdmin =
    async () => {

      if (!email) {

        toast.error(
          "Enter email"
        );

        return;
      }

      try {

        await makeAdmin(email);

        toast.success(
          "New Admin Added"
        );

        setEmail("");

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data?.message ||

          "Failed to add admin"
        );
      }
    };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-2xl mx-auto py-20 px-5">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Add Admin
          </h1>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-700"
          />

          <button
            onClick={handleAddAdmin}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Add Admin
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default AddAdmin;