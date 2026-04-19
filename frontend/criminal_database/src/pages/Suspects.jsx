import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { suspectAPI } from "../services/api";

export default function Suspects() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [suspects, setSuspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        const res = await suspectAPI.getSuspects();
        setSuspects(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load suspect list.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuspects();
  }, []);

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Active Suspects</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Review the current suspect list and investigation status.
          </p>
        </div>
      </div>

      {error && <div style={{ color: "#f87171", marginBottom: 16 }}>{error}</div>}

      <div style={{
        background: "#0f172a", borderRadius: 16, padding: 24,
        border: "1px solid #334155"
      }}>
        <h2 style={{ margin: 0, color: "#e2e8f0", marginBottom: 16 }}>Suspects</h2>

        {loading ? (
          <div style={{ color: "#94a3b8" }}>Loading suspects...</div>
        ) : suspects.length === 0 ? (
          <div style={{ color: "#64748b" }}>No suspect records found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
                  <th style={{ padding: "14px" }}>ID</th>
                  <th style={{ padding: "14px" }}>Name</th>
                  <th style={{ padding: "14px" }}>Gender</th>
                  <th style={{ padding: "14px" }}>Status</th>
                  <th style={{ padding: "14px" }}>Contact</th>
                  <th style={{ padding: "14px" }}>Location</th>
                  <th style={{ padding: "14px" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {suspects.map((suspect) => (
                  <tr key={suspect.suspect_id} style={{ borderBottom: "1px solid #1e293b" }}>
                    <td style={{ padding: "14px", color: "#e2e8f0" }}>{suspect.suspect_id}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>
                      {suspect.first_name} {suspect.last_name}
                    </td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{suspect.gender}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{suspect.status}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{suspect.contact_number || 'N/A'}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{suspect.location || 'Unknown'}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{suspect.suspect_description || 'No details'}</td>
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
