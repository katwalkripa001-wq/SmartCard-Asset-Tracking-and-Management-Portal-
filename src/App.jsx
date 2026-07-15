import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { CardsProvider } from "./context/CardsContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import HRDashboard from "./pages/dashboards/HRDashboard";
import SecurityDashboard from "./pages/dashboards/SecurityDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CardsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/manager"
              element={
                <ProtectedRoute role="manager">
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/hr"
              element={
                <ProtectedRoute role="hr">
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/security"
              element={
                <ProtectedRoute role="security">
                  <SecurityDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/employee"
              element={
                <ProtectedRoute role="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CardsProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
