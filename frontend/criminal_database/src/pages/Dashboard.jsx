import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const statCards = [
  { label: "Total Crimes", icon: "🗂️", key: "crimes", color: "#3b82f6", path: "/crimes" },
  { label: "Criminals", icon: "🔒", key: "criminals", color: "#f59e0b", path: "/criminals" },
  { label: "Arrests", icon: "⛓️", key: "arrests", color: "#ef4444", path: "/arrests" },
  { label: "Evidence Items", icon: "🧪", key: "evidence", color: "#22c55e", path: "/evidence" },
  { label: "Active Suspects", icon: "🔍", key: "suspects", color: "#8b5cf6", path: "/suspects" },
  { label: "Victims", icon: "🛡️", key: "victims", color: "#06b6d4", path: "/victims" },
];

const quickLinks = [
  { label: "Register FIR", icon: "📝", path: "/crimes/register", color: "#3b82f6" },
  { label: "Add Criminal", icon: "➕", path: "/criminals/add", color: "#f59e0b" },
  { label: "View Crime Map", icon: "🗺️", path: "/map", color: "#22c55e" },
  { label: "Generate Report", icon: "📈", path: "/reports", color: "#8b5cf6" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Placeholder stats - replace with real API calls later
  const stats = {
    crimes: 142, criminals: 89,
    arrests: 67, evidence: 234,
    suspects: 45, victims: 118
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("token", "test")
    localStorage.setItem("user", JSON.stringify({username: "Madhuri", user_type: "Admin"}))

  };

  return (
    <Layout user={user} onLogout={handleLogout}>
      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%)",
        borderRadius: 16, padding: "28px 32px", marginBottom: 32,
        border: "1px solid #1d4ed8", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(59,130,246,0.08)"
        }} />
        <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>
          Welcome back,
        </div>
        <div style={{ color: "#e2e8f0", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
          {user?.username || "Officer"} 👋
        </div>
        <div style={{
          display: "inline-block", background: "rgba(59,130,246,0.2)",
          color: "#60a5fa", padding: "4px 12px", borderRadius: 20,
          fontSize: 12, border: "1px solid rgba(59,130,246,0.3)"
        }}>
          {user?.user_type || "Officer"}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16, marginBottom: 32
      }}>
        {statCards.map((card) => (
          <div
            key={card.key}
            onClick={() => navigate(card.path)}
            style={{
              background: "#1e293b", borderRadius: 14, padding: "22px 24px",
              border: "1px solid #334155", cursor: "pointer",
              transition: "all 0.2s", display: "flex",
              alignItems: "center", gap: 16
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = card.color;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 12, fontSize: 22,
              background: `${card.color}20`,
              border: `1px solid ${card.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {card.icon}
            </div>
            <div>
              <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>
                {card.label}
              </div>
              <div style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700 }}>
                {stats[card.key]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          color: "#64748b", fontSize: 11, letterSpacing: 2,
          marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace"
        }}>
          QUICK ACTIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {quickLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                background: "#1e293b", border: `1px solid #334155`,
                borderRadius: 12, padding: "16px", cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 8, transition: "all 0.2s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = `${link.color}15`;
                e.currentTarget.style.borderColor = link.color;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "#1e293b";
                e.currentTarget.style.borderColor = "#334155";
              }}
            >
              <span style={{ fontSize: 24 }}>{link.icon}</span>
              <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div style={{
        background: "#1e293b", borderRadius: 14, padding: "24px",
        border: "1px solid #334155"
      }}>
        <div style={{
          color: "#64748b", fontSize: 11, letterSpacing: 2,
          marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace"
        }}>
          RECENT CRIMES
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "12px 0",
            borderBottom: i < 3 ? "1px solid #1e293b" : "none"
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "#0f172a", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14
            }}>
              🗂️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}>
                Crime Record #{1000 + i}
              </div>
              <div style={{ color: "#475569", fontSize: 12 }}>
                Connect API to show real data
              </div>
            </div>
            <div style={{
              background: "rgba(59,130,246,0.1)", color: "#60a5fa",
              padding: "4px 10px", borderRadius: 20, fontSize: 11
            }}>
              Active
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}