import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { crimeAPI } from "../services/api";

const formatList = (value, delimiter = '||') => {
  if (!value) return [];
  return value.split(delimiter).map((item) => item.trim()).filter(Boolean);
};

export default function CrimeRecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crime, setCrime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadCrime = async () => {
      try {
        const res = await crimeAPI.getCrimeById(id);
        setCrime(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load crime details.");
      } finally {
        setLoading(false);
      }
    };

    loadCrime();
  }, [id]);

  if (loading) {
    return (
      <Layout user={user}>
        <div style={{ color: "#94a3b8" }}>Loading crime details...</div>
      </Layout>
    );
  }

  if (error || !crime) {
    return (
      <Layout user={user}>
        <div style={{ color: "#f87171" }}>{error || "Crime not found."}</div>
      </Layout>
    );
  }

  const criminals = formatList(crime.criminals);
  const officers = formatList(crime.officers);
  const suspects = formatList(crime.suspects);
  const victims = formatList(crime.victims);

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Crime #{crime.crime_id}</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Detailed crime record with linked criminals, officers, suspects, victims, and location.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#1d4ed8",
            color: "white",
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer"
          }}
        >
          Back
        </button>
      </div>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 320px" }}>
        <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
            <div style={{ background: "#111827", padding: "10px 16px", borderRadius: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>Type</div>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700 }}>{crime.crime_type_name}</div>
            </div>
            <div style={{ background: "#111827", padding: "10px 16px", borderRadius: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>Status</div>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700 }}>{crime.crime_status}</div>
            </div>
            <div style={{ background: "#111827", padding: "10px 16px", borderRadius: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>Date</div>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700 }}>{crime.crime_date}</div>
            </div>
            <div style={{ background: "#111827", padding: "10px 16px", borderRadius: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase" }}>Time</div>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700 }}>{crime.crime_time || "N/A"}</div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#94a3b8", marginBottom: 10 }}>Description</div>
            <div style={{ color: "#cbd5e1", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {crime.crime_description || "No description provided."}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#94a3b8", marginBottom: 10 }}>Damage Estimate</div>
            <div style={{ color: "#cbd5e1" }}>
              {crime.damage_estimate ? `₹ ${crime.damage_estimate}` : "Not recorded"}
            </div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
              <div style={{ background: "#111827", padding: 18, borderRadius: 18 }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8 }}>Criminals</div>
                {criminals.length > 0 ? criminals.map((item) => (
                  <div key={item} style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 8 }}>{item}</div>
                )) : (
                  <div style={{ color: "#64748b", fontSize: 13 }}>No known criminals</div>
                )}
              </div>
              <div style={{ background: "#111827", padding: 18, borderRadius: 18 }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8 }}>Officers</div>
                {officers.length > 0 ? officers.map((item) => (
                  <div key={item} style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 8 }}>{item}</div>
                )) : (
                  <div style={{ color: "#64748b", fontSize: 13 }}>No officers assigned</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 20, padding: 24 }}>
            <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase", marginBottom: 14 }}>
              Location
            </div>
            <div style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              {crime.address1}, {crime.city}
            </div>
            <div style={{ color: "#cbd5e1", marginBottom: 12 }}>
              {crime.district}, {crime.state}, {crime.country} — {crime.pincode}
            </div>
            <button
              onClick={() => navigate(`/map?locationId=${crime.location_id}`)}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                width: "100%"
              }}
            >
              View on Crime Map
            </button>
          </div>

          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 20, padding: 24 }}>
            <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase", marginBottom: 14 }}>
              Related Records
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "#94a3b8", marginBottom: 8 }}>Suspects</div>
              {suspects.length > 0 ? suspects.map((item) => (
                <div key={item} style={{ color: "#cbd5e1", marginBottom: 10 }}>{item}</div>
              )) : (
                <div style={{ color: "#64748b" }}>No suspects recorded</div>
              )}
            </div>
            <div>
              <div style={{ color: "#94a3b8", marginBottom: 8 }}>Victims</div>
              {victims.length > 0 ? victims.map((item) => (
                <div key={item} style={{ color: "#cbd5e1", marginBottom: 10 }}>{item}</div>
              )) : (
                <div style={{ color: "#64748b" }}>No victims recorded</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
