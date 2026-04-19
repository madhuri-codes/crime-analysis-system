import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { victimAPI } from "../services/api";

export default function Victims() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [victims, setVictims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVictims = async () => {
      try {
        const res = await victimAPI.getVictims();
        setVictims(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load victim list.");
      } finally {
        setLoading(false);
      }
    };

    fetchVictims();
  }, []);

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Victims</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Review the victim records and associated case locations.
          </p>
        </div>
      </div>

      {error && <div style={{ color: "#f87171", marginBottom: 16 }}>{error}</div>}

      <div style={{
        background: "#0f172a", borderRadius: 16, padding: 24,
        border: "1px solid #334155"
      }}>
        <h2 style={{ margin: 0, color: "#e2e8f0", marginBottom: 16 }}>Victim records</h2>

        {loading ? (
          <div style={{ color: "#94a3b8" }}>Loading victims...</div>
        ) : victims.length === 0 ? (
          <div style={{ color: "#64748b" }}>No victim records found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
                  <th style={{ padding: "14px" }}>ID</th>
                  <th style={{ padding: "14px" }}>Name</th>
                  <th style={{ padding: "14px" }}>Gender</th>
                  <th style={{ padding: "14px" }}>Contact</th>
                  <th style={{ padding: "14px" }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {victims.map((victim) => (
                  <tr key={victim.victim_id} style={{ borderBottom: "1px solid #1e293b" }}>
                    <td style={{ padding: "14px", color: "#e2e8f0" }}>{victim.victim_id}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>
                      {victim.first_name} {victim.last_name}
                    </td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{victim.gender}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{victim.contact_number || 'N/A'}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{victim.location || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
