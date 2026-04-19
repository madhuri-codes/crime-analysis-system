import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { arrestAPI } from "../services/api";

export default function Arrests() {
  const [arrests, setArrests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    officer: "",
    suspect: "",
    crimeType: "",
    date: "",
  });
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArrests = async () => {
      try {
        const res = await arrestAPI.getArrests();
        setArrests(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load arrest records.");
      } finally {
        setLoading(false);
      }
    };

    loadArrests();
  }, []);

  const filteredArrests = useMemo(() => {
    return arrests.filter((arrest) => {
      const officerMatch = arrest.officer_name?.toLowerCase().includes(filters.officer.toLowerCase());
      const suspectMatch = arrest.suspect_name?.toLowerCase().includes(filters.suspect.toLowerCase());
      const crimeMatch = arrest.crime_type?.toLowerCase().includes(filters.crimeType.toLowerCase());
      const dateMatch = filters.date ? arrest.arrest_date === filters.date : true;
      return officerMatch && suspectMatch && crimeMatch && dateMatch;
    });
  }, [filters, arrests]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Arrest Records</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Search arrest records by officer, suspect, crime type, or arrest date.
          </p>
        </div>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginBottom: 24 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, color: "#94a3b8" }}>
            Officer
            <input
              name="officer"
              value={filters.officer}
              onChange={handleFilterChange}
              placeholder="Search officer"
              style={{ padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, color: "#94a3b8" }}>
            Suspect
            <input
              name="suspect"
              value={filters.suspect}
              onChange={handleFilterChange}
              placeholder="Search suspect"
              style={{ padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, color: "#94a3b8" }}>
            Crime Type
            <input
              name="crimeType"
              value={filters.crimeType}
              onChange={handleFilterChange}
              placeholder="Search crime type"
              style={{ padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, color: "#94a3b8" }}>
            Arrest Date
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              style={{ padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}
            />
          </label>
        </div>
      )}

      {error && <div style={{ padding: 16, marginBottom: 16, borderRadius: 12, background: "#7f1d1d", color: "#fee2e2" }}>{error}</div>}

      <div style={{ overflowX: "auto", background: "#0f172a", borderRadius: 16, border: "1px solid #334155" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
              <th style={{ padding: "16px" }}>Arrest ID</th>
              <th style={{ padding: "16px" }}>Case Number</th>
              <th style={{ padding: "16px" }}>Date / Time</th>
              <th style={{ padding: "16px" }}>Officer</th>
              <th style={{ padding: "16px" }}>Crime Type</th>
              <th style={{ padding: "16px" }}>Related Incident</th>
              <th style={{ padding: "16px" }}>Location</th>
              <th style={{ padding: "16px" }}>Status</th>
              <th style={{ padding: "16px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ padding: 24, color: "#94a3b8" }}>
                  Loading arrest records...
                </td>
              </tr>
            ) : filteredArrests.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: 24, color: "#94a3b8" }}>
                  No arrest records match your filters.
                </td>
              </tr>
            ) : (
              filteredArrests.map((arrest) => (
                <tr
                  key={arrest.arrest_id}
                  style={{ borderBottom: "1px solid #1e293b", cursor: "pointer" }}
                  onClick={() => navigate(`/arrests/${arrest.arrest_id}`)}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.08)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "16px", color: "#e2e8f0" }}>{arrest.arrest_id}</td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>{arrest.case_number}</td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>
                    {arrest.arrest_date} {arrest.arrest_time}
                  </td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/officers");
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#60a5fa",
                        cursor: "pointer",
                        padding: 0,
                        font: "inherit",
                        textDecoration: "underline",
                      }}
                    >
                      {arrest.officer_name}
                    </button>
                  </td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>{arrest.crime_type}</td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>{arrest.incident}</td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>{arrest.location}</td>
                  <td style={{ padding: "16px", color: arrest.status === "Closed" ? "#22c55e" : arrest.status === "Pending" ? "#f59e0b" : "#93c5fd" }}>
                    {arrest.status}
                  </td>
                  <td style={{ padding: "16px", color: "#cbd5e1" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/crimes/${arrest.crime_id}`);
                      }}
                      style={{
                        background: "#1d4ed8",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      View Crime
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
