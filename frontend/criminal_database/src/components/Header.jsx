import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 260, right: 0, height: 64,
      background: "#0f172a", borderBottom: "1px solid #1e293b",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", zIndex: 100
    }}>
      {/* Left - Page title area */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#22c55e", boxShadow: "0 0 8px #22c55e"
        }} />
        <span style={{
          color: "#94a3b8", fontSize: 13,
          fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1
        }}>
          CRIMINAL DATABASE SYSTEM
        </span>
      </div>

      {/* Right - User info */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* User badge */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: 10, padding: "8px 14px", cursor: "pointer",
              transition: "border-color 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = "#3b82f6"}
            onMouseOut={e => e.currentTarget.style.borderColor = "#334155"}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 13, fontWeight: 700
            }}>
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>
                {user?.username || "Officer"}
              </div>
              <div style={{ color: "#64748b", fontSize: 11 }}>
                {user?.user_type || "User"}
              </div>
            </div>
            <span style={{ color: "#64748b", fontSize: 10 }}>▼</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div style={{
              position: "absolute", top: "110%", right: 0, minWidth: 160,
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: 10, overflow: "hidden", zIndex: 200,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
            }}>
              <button onClick={handleLogout} style={{ ...dropdownItemStyle, color: "#f87171" }}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const dropdownItemStyle = {
  width: "100%", padding: "12px 16px", background: "none",
  border: "none", cursor: "pointer", color: "#cbd5e1",
  fontSize: 13, textAlign: "left", transition: "background 0.2s",
  display: "block"
};