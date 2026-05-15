import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Flights from "./pages/Flights";

import Booking from "./pages/Booking";

import Payment from "./pages/Payment";

import Admin from "./pages/Admin";

import Ticket from "./pages/Ticket";

import AddAdmin from "./pages/AddAdmin";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/flights"
          element={<Flights />}
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>

              <Booking />

            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>

              <Payment />

            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              adminOnly={true}
            >

              <Admin />

            </ProtectedRoute>
          }
        />

        <Route
          path="/add-admin"
          element={
            <ProtectedRoute
              adminOnly={true}
            >

              <AddAdmin />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ticket"
          element={<Ticket />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;