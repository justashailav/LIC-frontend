import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Plans from "./components/Plans";
import PlanDetails from "./components/PlanDetails";
import About from "./components/About";
import Contact from "./components/Contact";
import Achievements from "./components/Achievements";
import FloatingChat from "./components/FloatingChat";
import AdminLogin from "./Pages/Admin-login";
import AdminLayout from "./Pages/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminPlans from "./Pages/Plans";
import Loader from "./components/Loader";   // ✅ Import Loader

import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [loading, setLoading] = useState(false);

  // 🔄 Show loader on route change
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // smooth transition (you can increase to 800)

    return () => clearTimeout(timer);
  }, [location]);

  // 🔒 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
      return <Navigate to="/admin-login" />;
    }

    return children;
  };

  return (
    <>
      {loading && <Loader />}   {/* ✅ Loader Added Here */}

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/:slug" element={<PlanDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="plans" element={<AdminPlans />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminRoute && <FloatingChat />}
    </>
  );
}

export default App;
