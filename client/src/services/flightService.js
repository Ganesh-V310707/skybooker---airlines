import axios from "axios";

const API =
  "http://localhost:5000/api/flights";

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {
      authorization: token,
    },
  };
};

export const getFlights =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };

export const addFlight =
  async (flightData) => {

    const response =
      await axios.post(

        API,

        flightData,

        getAuthConfig()
      );

    return response.data;
  };

export const deleteFlight =
  async (id) => {

    const response =
      await axios.delete(

        `${API}/${id}`,

        getAuthConfig()
      );

    return response.data;
  };