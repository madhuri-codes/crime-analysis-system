import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const userTypes = ["Civilian", "Officer", "Admin"];

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 2 step form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "",
    officer_id: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.username || !form.email) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.user_type) {
      setError("Please fill all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    // Check if Officer or Admin role requires officer_id
    if ((form.user_type === 'Officer' || form.user_type === 'Admin') && !form.officer_id) {
      setError("Officer ID is required for police accounts");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authAPI.signup({
        username: form.username,
        email: form.email,
        password: form.password,
        user_type: form.user_type,
        officer_id: form.officer_id || null
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div style={{
        minHeight: "100vh", background: "#060d1a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif"
      }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "2px solid #22c55e",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, margin: "0 auto 24px"
          }}>
            ✅
          </div>
          <h2 style={{ color: "#e2e8f0", fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Account Created!
          </h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>
            Your account has been successfully registered.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#3b82f6", border: "none", color: "white",
              padding: "12px 32px", borderRadius: 10, cursor: "pointer",
              fontSize: 14, fontWeight: 600
            }}
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060d1a",
      display: "flex",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Left panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "60px 48px", position: "relative",
        borderRight: "1px solid #1e293b",
        background: "linear-gradient(135deg, #060d1a 0%, #0f1f3d 100%)"
      }}>
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
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
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#e2e8f0", marginBottom: 8 }}>
            Crime<span style={{ color: "#3b82f6" }}>Base</span>
          </h1>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
            Create your account to access the Criminal Database System
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ zIndex: 1, width: "100%", maxWidth: 300 }}>
          <div style={{
            color: "#475569", fontSize: 11, letterSpacing: 2, marginBottom: 16
          }}>
            REGISTRATION STEPS
          </div>
          {[
            { num: 1, label: "Basic Information" },
            { num: 2, label: "Account Setup" },
          ].map((s) => (
            <div key={s.num} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", borderRadius: 10, marginBottom: 10,
              background: step === s.num
                ? "rgba(59,130,246,0.1)"
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${step === s.num ? "rgba(59,130,246,0.3)" : "#1e293b"}`,
              transition: "all 0.3s"
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step > s.num
                  ? "#22c55e"
                  : step === s.num ? "#3b82f6" : "#1e293b",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 12,
                color: "white", fontWeight: 700, flexShrink: 0
              }}>
                {step > s.num ? "✓" : s.num}
              </div>
              <span style={{
                color: step === s.num ? "#60a5fa" : "#475569",
                fontSize: 13, fontWeight: step === s.num ? 600 : 400
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          position: "absolute", bottom: 32,
          color: "#334155", fontSize: 12, textAlign: "center"
        }}>
          NITK Surathkal · CS254 DBMS Project · 2024
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 480, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 48px"
      }}>
        {/* Back button */}
        <button
          onClick={() => step === 1 ? navigate("/login") : setStep(1)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#475569", fontSize: 13, textAlign: "left",
            marginBottom: 40, padding: 0,
            display: "flex", alignItems: "center", gap: 6,
            transition: "color 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.color = "#94a3b8"}
          onMouseOut={e => e.currentTarget.style.color = "#475569"}
        >
          ← {step === 1 ? "Back to login" : "Back to step 1"}
        </button>

        {/* Heading */}
        <h2 style={{
          fontSize: 26, fontWeight: 700, color: "#e2e8f0", marginBottom: 6
        }}>
          {step === 1 ? "Create Account" : "Set Up Access"}
        </h2>
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 32 }}>
          {step === 1
            ? "Step 1 of 2 — Enter your basic details"
            : "Step 2 of 2 — Choose your role and password"}
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            color: "#f87171", fontSize: 13,
            display: "flex", alignItems: "center", gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleNext}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>USERNAME</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. officer_madhuri"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#1e293b"}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="officer@police.gov.in"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#1e293b"}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>OFFICER ID <span style={{ color: "#334155" }}>(required for Officer/Admin)</span></label>
              <input
                type="number"
                name="officer_id"
                value={form.officer_id}
                onChange={handleChange}
                placeholder="Only required if registering as Officer or Admin"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#1e293b"}
              />
            </div>

            <button type="submit" style={btnStyle}>
              Continue →
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            {/* Role selector */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>SELECT ROLE</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {userTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, user_type: type })}
                    style={{
                      padding: "12px", borderRadius: 10, cursor: "pointer",
                      border: form.user_type === type
                        ? "1px solid #3b82f6"
                        : "1px solid #1e293b",
                      background: form.user_type === type
                        ? "rgba(59,130,246,0.15)"
                        : "#0f172a",
                      color: form.user_type === type ? "#60a5fa" : "#64748b",
                      fontSize: 13, fontWeight: form.user_type === type ? 600 : 400,
                      transition: "all 0.2s"
                    }}
                  >
                    {type === "Admin" && "🛡️ "}
                    {type === "Officer" && "👮 "}
                    {type === "Investigator" && "🔍 "}
                    {type === "Analyst" && "📊 "}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  style={{ ...inputStyle, paddingRight: 48 }}
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

            {/* Confirm password */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                style={{
                  ...inputStyle,
                  borderColor: form.confirmPassword && form.password !== form.confirmPassword
                    ? "#ef4444" : "#1e293b"
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#1e293b"}
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <div style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>
                  Passwords do not match
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...btnStyle,
                background: loading ? "#1e3a5f" : "#3b82f6",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Creating account..." : "Create Account ✓"}
            </button>
          </form>
        )}

        {/* Login link */}
        <p style={{
          color: "#475569", fontSize: 13,
          textAlign: "center", marginTop: 28
        }}>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none", border: "none",
              color: "#3b82f6", cursor: "pointer",
              fontSize: 13, fontWeight: 600
            }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  color: "#64748b", fontSize: 12,
  letterSpacing: 1, display: "block", marginBottom: 8
};

const inputStyle = {
  width: "100%", padding: "13px 16px",
  background: "#0f172a", border: "1px solid #1e293b",
  borderRadius: 10, color: "#e2e8f0", fontSize: 14,
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s"
};

const btnStyle = {
  width: "100%", padding: "14px",
  background: "#3b82f6", border: "none",
  borderRadius: 10, color: "white",
  fontSize: 15, fontWeight: 600,
  cursor: "pointer", transition: "all 0.2s",
  boxShadow: "0 0 24px rgba(59,130,246,0.3)"
};
