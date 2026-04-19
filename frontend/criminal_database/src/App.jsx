import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CrimeMap from "./pages/CrimeMap";
import CrimeRecords from "./pages/CrimeRecords";
import CrimeRecordDetail from "./pages/CrimeRecordDetail";
import Arrests from "./pages/Arrests";
import ArrestDetail from "./pages/ArrestDetail";
import Officers from "./pages/Officers";
import Criminals from "./pages/Criminals";
import Profile from "./pages/Profile";
import Evidence from "./pages/Evidence";
import Suspects from "./pages/Suspects";
import Victims from "./pages/Victims";
import Report from "./pages/Report";
import Reports from "./pages/Reports";

// Placeholder component for pages not built yet
const ComingSoon = ({ page }) => (
  <div style={{
    minHeight: "100vh", background: "#0f172a",
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{ textAlign: "center", color: "#64748b" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <div style={{ fontSize: 20, color: "#e2e8f0", marginBottom: 8 }}>{page}</div>
      <div style={{ fontSize: 14 }}>This page is coming soon</div>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/crimes" element={
          <ProtectedRoute><CrimeRecords /></ProtectedRoute>
        } />
        <Route path="/crimes/:id" element={
          <ProtectedRoute><CrimeRecordDetail /></ProtectedRoute>
        } />
        <Route path="/crimes/register" element={
          <ProtectedRoute><Report /></ProtectedRoute>
        } />
        <Route path="/suspects" element={
          <ProtectedRoute><Suspects /></ProtectedRoute>
        } />
        <Route path="/victims" element={
          <ProtectedRoute><Victims /></ProtectedRoute>
        } />
        <Route path="/arrests" element={
          <ProtectedRoute><Arrests /></ProtectedRoute>
        } />
        <Route path="/arrests/:id" element={
          <ProtectedRoute><ArrestDetail /></ProtectedRoute>
        } />
        <Route path="/evidence" element={
          <ProtectedRoute><Evidence /></ProtectedRoute>
        } />
        <Route path="/officers" element={
          <ProtectedRoute><Officers /></ProtectedRoute>
        } />
        <Route path="/criminals" element={
          <ProtectedRoute><Criminals /></ProtectedRoute>
        } />
        <Route path="/map" element={
          <ProtectedRoute><CrimeMap /></ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
