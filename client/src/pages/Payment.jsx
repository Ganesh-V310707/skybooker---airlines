import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import toast from "react-hot-toast";

import {
  confirmBooking,
} from "../services/bookingService";

function Payment() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const booking =
    location.state?.booking;

  const handlePayment =
    async () => {

      try {

        await confirmBooking(
          booking.id
        );

        toast.success(
          "Payment Successful"
        );

        navigate(
          "/ticket",
          {
            replace: true,
          }
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Payment Failed"
        );
      }
    };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
      }}
    >

      <Navbar />

      <div className="max-w-3xl mx-auto px-5 py-20">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

          <h1 className="text-5xl font-bold mb-10">
            Payment
          </h1>

          <div className="space-y-5 text-xl mb-10">

            <div>
              Seat:
              {" "}
              {booking?.seatNumber}
            </div>

            <div>
              Passenger:
              {" "}
              {booking?.passengerName}
            </div>

            <div>
              Amount:
              {" "}
              ₹1
            </div>

            <div>
              Status:
              {" "}
              Pending
            </div>

          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-2xl text-black font-bold text-xl"
          >
            Pay ₹1
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Payment;