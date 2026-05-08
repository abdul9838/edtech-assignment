import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/private/Dashboard";
import Register from "./pages/auth/Register";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") window.location.pathname = "/login";
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Wrap protected components */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
