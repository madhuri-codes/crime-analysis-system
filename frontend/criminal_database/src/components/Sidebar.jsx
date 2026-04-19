import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Crime Records", icon: "🗂️", path: "/crimes" },
  { label: "Criminals", icon: "🔒", path: "/criminals" },
  { label: "Arrests", icon: "⛓️", path: "/arrests" },
  { label: "Officers", icon: "👮", path: "/officers" },
  { label: "Crime Map", icon: "🗺️", path: "/map" },
  { label: "Reports", icon: "📈", path: "/reports" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside style={{
      position: "fixed", top: 0, left: 0, bottom: 0, width: 260,
      background: "#080f1e", borderRight: "1px solid #1e293b",
      display: "flex", flexDirection: "column", zIndex: 200
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px 20px",
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 0 20px rgba(59,130,246,0.4)"
          }}>
            ⚖️
          </div>
          <div>
            <div style={{
              color: "#e2e8f0", fontSize: 14, fontWeight: 700,
              fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5
            }}>
              CrimeBase
            </div>
            <div style={{ color: "#3b82f6", fontSize: 10, letterSpacing: 2 }}>
              LAW ENFORCEMENT
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <div style={{
          color: "#475569", fontSize: 10, letterSpacing: 2,
          padding: "8px 8px 12px", fontFamily: "'IBM Plex Mono', monospace"
        }}>
          NAVIGATION
        </div>

        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 12px", borderRadius: 10, marginBottom: 4,
                border: "none", cursor: "pointer", textAlign: "left",
                background: isActive
                  ? "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))"
                  : "transparent",
                borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                transition: "all 0.2s"
              }}
              onMouseOver={e => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseOut={e => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>
                {link.icon}
              </span>
              <span style={{
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                color: isActive ? "#60a5fa" : "#94a3b8"
              }}>
                {link.label}
              </span>
              {isActive && (
                <div style={{
                  marginLeft: "auto", width: 6, height: 6,
                  borderRadius: "50%", background: "#3b82f6"
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom - system info */}
      <div style={{
        padding: "16px 20px", borderTop: "1px solid #1e293b"
      }}>
        <div style={{
          background: "#0f172a", borderRadius: 10, padding: "12px 14px",
          border: "1px solid #1e293b"
        }}>
          <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>
            SYSTEM STATUS
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 6px #22c55e"
            }} />
            <span style={{ color: "#64748b", fontSize: 12 }}>All systems online</span>
          </div>
          <div style={{ color: "#334155", fontSize: 11, marginTop: 8 }}>
            CS254 — DBMS Project
          </div>
        </div>
      </div>
    </aside>
  );
}