import axios from "axios";

const API =
  "https://skybooker---airlines.onrender.com/api/auth";

export const registerUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/register`,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    const data = response.data;

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "role",
      data.user.role
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    return data;
  };

export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("role");

  localStorage.removeItem("isLoggedIn");
};