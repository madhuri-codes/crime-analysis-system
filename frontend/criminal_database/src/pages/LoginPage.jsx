import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authAPI.login(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error details:", err);
      const errorMsg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060d1a",
      display: "flex",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Left panel — branding */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "60px 48px", position: "relative",
        borderRight: "1px solid #1e293b",
        background: "linear-gradient(135deg, #060d1a 0%, #0f1f3d 100%)"
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 48, zIndex: 1 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, fontSize: 36,
            background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 0 40px rgba(59,130,246,0.4)"
          }}>
            ⚖️
          </div>
          <h1 style={{
            fontSize: 32, fontWeight: 800, color: "#e2e8f0",
            marginBottom: 8
          }}>
            Crime<span style={{ color: "#3b82f6" }}>Base</span>
          </h1>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
            Criminal Database & Crime Analysis System for Law Enforcement
          </p>
        </div>

        {/* Feature bullets */}
        <div style={{ zIndex: 1, width: "100%", maxWidth: 320 }}>
          {[
            { icon: "🔐", text: "Secure role-based access control" },
            { icon: "🗂️", text: "Centralized crime record management" },
            { icon: "📈", text: "Real-time crime analytics & reports" },
            { icon: "🗺️", text: "GIS-based crime hotspot mapping" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: 10, marginBottom: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid #1e293b"
            }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ color: "#64748b", fontSize: 13 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* NITK badge */}
        <div style={{
          position: "absolute", bottom: 32,
          color: "#334155", fontSize: 12, textAlign: "center"
        }}>
          NITK Surathkal · CS254 DBMS Project · 2026
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        width: 480, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 48px"
      }}>
        {/* Back to home */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#475569", fontSize: 13, textAlign: "left",
            marginBottom: 40, padding: 0, display: "flex",
            alignItems: "center", gap: 6, transition: "color 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.color = "#94a3b8"}
          onMouseOut={e => e.currentTarget.style.color = "#475569"}
        >
          ← Back to home
        </button>

        {/* Heading */}
        <h2 style={{
          fontSize: 28, fontWeight: 700,
          color: "#e2e8f0", marginBottom: 8
        }}>
          Welcome back
        </h2>
        <p style={{ color: "#475569", fontSize: 14, marginBottom: 36 }}>
          Sign in to access the system
        </p>

        {/* Error message */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            color: "#f87171", fontSize: 13, display: "flex",
            alignItems: "center", gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              color: "#64748b", fontSize: 12,
              letterSpacing: 1, display: "block", marginBottom: 8
            }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="officer@police.gov.in"
              required
              style={{
                width: "100%", padding: "13px 16px",
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: 10, color: "#e2e8f0", fontSize: 14,
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = "#1e293b"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              color: "#64748b", fontSize: 12,
              letterSpacing: 1, display: "block", marginBottom: 8
            }}>
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%", padding: "13px 48px 13px 16px",
                  background: "#0f172a", border: "1px solid #1e293b",
                  borderRadius: 10, color: "#e2e8f0", fontSize: 14,
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#1e293b"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 14, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "#475569", fontSize: 16
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#1e3a5f" : "#3b82f6",
              border: "none", borderRadius: 10,
              color: "white", fontSize: 15, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 0 24px rgba(59,130,246,0.3)"
            }}
            onMouseOver={e => {
              if (!loading) e.currentTarget.style.background = "#2563eb";
            }}
            onMouseOut={e => {
              if (!loading) e.currentTarget.style.background = "#3b82f6";
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Role info */}
        <div style={{
          marginTop: 36, padding: "16px",
          background: "#0f172a", borderRadius: 10,
          border: "1px solid #1e293b"
        }}>
          <div style={{
            color: "#475569", fontSize: 11,
            letterSpacing: 1, marginBottom: 10
          }}>
            AVAILABLE ROLES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Admin", "Officer", "Investigator", "Analyst"].map((role) => (
              <span key={role} style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#60a5fa", padding: "4px 10px",
                borderRadius: 6, fontSize: 11
              }}>
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
