import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // 🔒 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};


  return (
    <>
      {/* Hide Navbar on admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/:slug" element={<PlanDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />

        {/* ========== ADMIN LOGIN ========== */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ========== PROTECTED ADMIN ROUTES ========== */}
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

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* Hide FloatingChat on admin pages */}
      {!isAdminRoute && <FloatingChat />}
    </>
  );
}

export default App;
