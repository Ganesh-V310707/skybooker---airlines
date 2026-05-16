import axios from "axios";

const API =
  "https://skybooker---airlines.onrender.com/api/bookings";

export const getBookings =
  async (flightId) => {

    const response =
      await axios.get(

        `${API}/${flightId}`
      );

    return response.data;
  };

export const getUserBookings =
  async (userId) => {

    const response =
      await axios.get(

        `${API}/user/${userId}`
      );

    return response.data;
  };

export const createBooking =
  async (bookingData) => {

    const response =
      await axios.post(
        API,
        bookingData
      );

    return response.data;
  };

export const confirmBooking =
  async (bookingId) => {

    const response =
      await axios.put(

        `${API}/confirm/${bookingId}`
      );

    return response.data;
  };