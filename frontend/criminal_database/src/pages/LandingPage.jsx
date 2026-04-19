import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const features = [
  { icon: "🗂️", title: "Crime Records", desc: "Register and manage FIRs with full case details" },
  { icon: "🔒", title: "Criminal Profiles", desc: "Track criminals across multiple cases and arrests" },
  { icon: "🧪", title: "Evidence Management", desc: "Log, track and store all crime evidence securely" },
  { icon: "🗺️", title: "Crime Mapping", desc: "GIS-based hotspot maps with location analytics" },
  { icon: "📈", title: "Crime Analysis", desc: "Dashboards, trends and repeat offender reports" },
  { icon: "👮", title: "Officer Management", desc: "Assign officers to cases and track performance" },
];

const stats = [
  { value: "17", label: "Database Tables" },
  { value: "26", label: "Relationships" },
  { value: "10+", label: "Modules" },
  { value: "3NF", label: "Normalized" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      background: "#060d1a",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#e2e8f0",
      overflowX: "hidden"
    }}>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,13,26,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #1e293b" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚖️</span>
          <span style={{
            color: "#e2e8f0", fontSize: 16, fontWeight: 700,
            letterSpacing: 1
          }}>
            Crime<span style={{ color: "#3b82f6" }}>Base</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent", border: "1px solid #334155",
              color: "#94a3b8", padding: "8px 20px", borderRadius: 8,
              cursor: "pointer", fontSize: 13, transition: "all 0.2s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "#3b82f6", border: "none",
              color: "white", padding: "8px 20px", borderRadius: 8,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#2563eb"}
            onMouseOut={e => e.currentTarget.style.background = "#3b82f6"}
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 24px 60px",
        position: "relative"
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: 20, padding: "6px 16px", marginBottom: 32,
          color: "#60a5fa", fontSize: 12, letterSpacing: 1
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 6px #22c55e"
          }} />
          NITK CS254 — DBMS Project 2024
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 68px)",
          fontWeight: 800, lineHeight: 1.1,
          marginBottom: 24, maxWidth: 800,
          background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Criminal Database &<br />
          <span style={{
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Crime Analysis
          </span> System
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "#64748b", fontSize: "clamp(14px, 2vw, 18px)",
          maxWidth: 560, lineHeight: 1.8, marginBottom: 40
        }}>
          A centralized platform for law enforcement to digitally record,
          manage, and analyze crime data — from FIR registration to GIS crime mapping.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#3b82f6", border: "none",
              color: "white", padding: "14px 32px", borderRadius: 10,
              cursor: "pointer", fontSize: 15, fontWeight: 600,
              boxShadow: "0 0 24px rgba(59,130,246,0.4)",
              transition: "all 0.2s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#3b82f6";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🚀 Enter System
          </button>
          <button
            onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", border: "1px solid #334155",
              color: "#94a3b8", padding: "14px 32px", borderRadius: 10,
              cursor: "pointer", fontSize: 15, transition: "all 0.2s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            Learn More ↓
          </button>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 0, marginTop: 72,
          background: "#0f172a", borderRadius: 16,
          border: "1px solid #1e293b", overflow: "hidden"
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "20px 36px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid #1e293b" : "none"
            }}>
              <div style={{
                fontSize: 28, fontWeight: 800, color: "#3b82f6", marginBottom: 4
              }}>
                {s.value}
              </div>
              <div style={{ color: "#475569", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: "80px 48px", maxWidth: 1100, margin: "0 auto"
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            color: "#3b82f6", fontSize: 12, letterSpacing: 2,
            marginBottom: 12
          }}>
            FEATURES
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#e2e8f0" }}>
            Everything in one place
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#0f172a", borderRadius: 14,
              padding: "28px", border: "1px solid #1e293b",
              transition: "all 0.2s"
            }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, fontSize: 22,
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: 16
              }}>
                {f.icon}
              </div>
              <div style={{
                color: "#e2e8f0", fontSize: 16,
                fontWeight: 600, marginBottom: 8
              }}>
                {f.title}
              </div>
              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{
        padding: "60px 48px", textAlign: "center",
        borderTop: "1px solid #1e293b"
      }}>
        <div style={{ color: "#475569", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>
          BUILT WITH
        </div>
        <div style={{
          display: "flex", gap: 16, justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {["⚛️ React.js", "🟢 Node.js", "🚂 Express.js", "🐬 MySQL", "🔐 JWT Auth", "🎨 Tailwind CSS"].map((tech) => (
            <div key={tech} style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: 8, padding: "8px 18px",
              color: "#94a3b8", fontSize: 13
            }}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #1e293b",
        padding: "24px 48px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12
      }}>
        <div style={{ color: "#334155", fontSize: 12 }}>
          © 2024 CrimeBase — NITK Surathkal | CS254 DBMS Project
        </div>
        <div style={{ color: "#334155", fontSize: 12 }}>
          Aluri Shanthi · D Jahnavi · Madhuri Nallaboyina · Neha Kamath
        </div>
      </footer>
    </div>
  );
}