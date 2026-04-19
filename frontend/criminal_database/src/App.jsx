import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CrimeMap from "./pages/CrimeMap";
import CrimeRecords from "./pages/CrimeRecords";
import CrimeRecordDetail from "./pages/CrimeRecordDetail";
import Officers from "./pages/Officers";
import Criminals from "./pages/Criminals";

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
        <Route path="/suspects" element={
          <ProtectedRoute><ComingSoon page="Suspects" /></ProtectedRoute>
        } />
        <Route path="/victims" element={
          <ProtectedRoute><ComingSoon page="Victims" /></ProtectedRoute>
        } />
        <Route path="/arrests" element={
          <ProtectedRoute><ComingSoon page="Arrests" /></ProtectedRoute>
        } />
        <Route path="/evidence" element={
          <ProtectedRoute><ComingSoon page="Evidence" /></ProtectedRoute>
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
          <ProtectedRoute><ComingSoon page="Reports" /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ComingSoon page="Profile" /></ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
