import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import {
  getUserBookings,
} from "../services/bookingService";

function Profile() {

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )
    );

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const data =
          await getUserBookings(
            user.id
          );

        setBookings(data);

      } catch (error) {

        console.log(error);
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

      <div className="max-w-5xl mx-auto px-5 py-16">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

          <h1 className="text-5xl font-bold mb-10">
            My Profile
          </h1>

          <div className="space-y-5 text-xl mb-14">

            <div>
              <span className="font-bold">
                Name:
              </span>{" "}
              {user?.name}
            </div>

            <div>
              <span className="font-bold">
                Email:
              </span>{" "}
              {user?.email}
            </div>

            <div>
              <span className="font-bold">
                Role:
              </span>{" "}
              {user?.role}
            </div>

          </div>

          <h2 className="text-4xl font-bold mb-8">
            My Bookings
          </h2>

          {bookings.length === 0 ? (

            <div className="text-gray-300 text-xl">
              No Bookings Yet
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="bg-white/10 border border-white/10 rounded-2xl p-6"
                >

                  <div className="mb-3 text-xl font-bold">
                    Seat:
                    {" "}
                    {booking.seatNumber}
                  </div>

                  <div className="mb-2">
                    Passenger:
                    {" "}
                    {booking.passengerName}
                  </div>

                  <div className="mb-2">
                    Airline:
                    {" "}
                    {booking.Flight?.airline}
                  </div>

                  <div className="mb-2">
                    Route:
                    {" "}
                    {booking.Flight?.route}
                  </div>

                  <div className="mb-2">
                    Time:
                    {" "}
                    {booking.Flight?.time}
                  </div>

                  <div className="mb-2">
                    Price:
                    {" "}
                    {booking.Flight?.price}
                  </div>

                  <div className="mb-2">
                    Payment:
                    {" "}
                    {booking.paymentStatus}
                  </div>

                  <div>
                    Status:
                    {" "}
                    {booking.bookingStatus}
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Profile;