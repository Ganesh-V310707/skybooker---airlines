import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

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

export const makeAdmin =
  async (email) => {

    const response =
      await axios.put(

        `${API}/make-admin/${email}`
      );

    return response.data;
  };

export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("role");

  localStorage.removeItem("isLoggedIn");
};