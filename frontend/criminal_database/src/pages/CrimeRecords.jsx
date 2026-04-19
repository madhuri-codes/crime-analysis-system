import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { crimeAPI } from "../services/api";

export default function CrimeRecords() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const res = await crimeAPI.getCrimes();
        setCrimes(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load crime records.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrimes();
  }, []);

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Crime Records</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Browse reported crimes, linked criminals, responsible officers, and case locations.
          </p>
        </div>
      </div>

      {error && <div style={{ color: "#f87171", marginBottom: 16 }}>{error}</div>}

      <div style={{ overflowX: "auto", background: "#0f172a", borderRadius: 16, border: "1px solid #334155" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1040 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
              <th style={{ padding: "16px" }}>Crime ID</th>
              <th style={{ padding: "16px" }}>Type</th>
              <th style={{ padding: "16px" }}>Date</th>
              <th style={{ padding: "16px" }}>Time</th>
              <th style={{ padding: "16px" }}>Location</th>
              <th style={{ padding: "16px" }}>Criminals</th>
              <th style={{ padding: "16px" }}>Officers</th>
              <th style={{ padding: "16px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ padding: 24, color: "#94a3b8" }}>
                  Loading crimes...
                </td>
              </tr>
            ) : crimes.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 24, color: "#94a3b8" }}>
                  No crime records found.
                </td>
              </tr>
            ) : crimes.map((crime) => (
              <tr
                key={crime.crime_id}
                onClick={() => navigate(`/crimes/${crime.crime_id}`)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #1e293b",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "16px", color: "#e2e8f0" }}>{crime.crime_id}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{crime.crime_type_name}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{crime.crime_date}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{crime.crime_time || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>
                  {crime.city ? `${crime.city}, ${crime.state}` : "No location"}
                </td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{crime.criminals || "No criminals"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{crime.officers || "No officers"}</td>
                <td style={{ padding: "16px", color: crime.crime_status === "Open" ? "#22c55e" : crime.crime_status === "Under Investigation" ? "#fbbf24" : "#94a3b8" }}>
                  {crime.crime_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
