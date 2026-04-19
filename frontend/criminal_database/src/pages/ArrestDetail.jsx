import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { arrestAPI } from "../services/api";

export default function ArrestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [record, setRecord] = useState(location.state?.arrest || null);
  const [loading, setLoading] = useState(!location.state?.arrest);
  const [error, setError] = useState("");

  useEffect(() => {
    if (record) {
      return;
    }

    const loadArrest = async () => {
      setLoading(true);
      try {
        const res = await arrestAPI.getArrestById(id);
        setRecord(res.data || null);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load arrest details.");
      } finally {
        setLoading(false);
      }
    };

    loadArrest();
  }, [id, record]);

  if (loading) {
    return (
      <Layout>
        <div style={{ color: "#94a3b8" }}>Loading arrest details...</div>
      </Layout>
    );
  }

  if (error || !record) {
    return (
      <Layout>
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ color: "#f87171" }}>{error || "Arrest details not found."}</div>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 16px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Back to Arrests
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            color: "#60a5fa",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: "10px 16px",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ← Back to Arrests
        </button>
        <h1 style={{ margin: 0, color: "#e2e8f0" }}>Arrest Detail</h1>
        <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
          Full details for arrest record {record.case_number}.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, border: "1px solid #334155" }}>
          <h2 style={{ color: "#e2e8f0", marginBottom: 16 }}>Primary Information</h2>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Arrest ID</div>
              <div style={{ color: "#e2e8f0" }}>{record.arrest_id}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Case Number</div>
              <div style={{ color: "#e2e8f0" }}>{record.case_number}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Date & Time</div>
              <div style={{ color: "#e2e8f0" }}>{record.arrest_date} {record.arrest_time}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Arresting Officer</div>
              <button
                type="button"
                onClick={() => navigate("/officers")}
                style={{ background: "transparent", border: "none", color: "#60a5fa", padding: 0, cursor: "pointer", textDecoration: "underline" }}
              >
                {record.officer_name}
              </button>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Crime Type</div>
              <div style={{ color: "#e2e8f0" }}>{record.crime_type}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Associated Crime</div>
              <button
                type="button"
                onClick={() => navigate(`/crimes/${record.crime_id}`)}
                style={{ background: "transparent", border: "none", color: "#60a5fa", padding: 0, cursor: "pointer", textDecoration: "underline" }}
              >
                View Crime #{record.crime_id}
              </button>
            </div>
          </div>
        </div>

        <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, border: "1px solid #334155" }}>
          <h2 style={{ color: "#e2e8f0", marginBottom: 16 }}>Arrest Summary</h2>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Suspect</div>
              <div style={{ color: "#e2e8f0" }}>{record.suspect_name}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Location</div>
              <div style={{ color: "#e2e8f0" }}>{record.arrest_location || record.location}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Incident</div>
              <div style={{ color: "#e2e8f0" }}>{record.related_incident || record.incident}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>Status / Outcome</div>
              <div style={{ color: record.status === "Closed" ? "#22c55e" : record.status === "Pending" ? "#fbbf24" : "#93c5fd" }}>
                {record.status} — {record.outcome}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
