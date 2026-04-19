import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { evidenceAPI } from "../services/api";

export default function Evidence() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await evidenceAPI.getEvidenceItems();
        setEvidenceItems(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load evidence items.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, []);

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Evidence</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Track and review collected evidence for reported cases.
          </p>
        </div>
      </div>

      {error && <div style={{ color: "#f87171", marginBottom: 16 }}>{error}</div>}

      <div style={{
        background: "#0f172a", borderRadius: 16, padding: 24,
        border: "1px solid #334155"
      }}>
        <h2 style={{ margin: 0, color: "#e2e8f0", marginBottom: 16 }}>Evidence items</h2>

        {loading ? (
          <div style={{ color: "#94a3b8" }}>Loading evidence items...</div>
        ) : evidenceItems.length === 0 ? (
          <div style={{ color: "#64748b" }}>No evidence items found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
                  <th style={{ padding: "14px" }}>ID</th>
                  <th style={{ padding: "14px" }}>Crime ID</th>
                  <th style={{ padding: "14px" }}>Type</th>
                  <th style={{ padding: "14px" }}>Collected</th>
                  <th style={{ padding: "14px" }}>Collected By</th>
                  <th style={{ padding: "14px" }}>Storage Location</th>
                  <th style={{ padding: "14px" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {evidenceItems.map((item) => (
                  <tr key={item.evidence_id} style={{ borderBottom: "1px solid #1e293b" }}>
                    <td style={{ padding: "14px", color: "#e2e8f0" }}>{item.evidence_id}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{item.crime_id}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{item.evidence_type}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>
                      {item.collected_date} {item.collected_time}
                    </td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{item.collected_by || 'Unknown'}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{item.storage_location || 'N/A'}</td>
                    <td style={{ padding: "14px", color: "#cbd5e1" }}>{item.evidence_description || 'No description'}</td>
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
