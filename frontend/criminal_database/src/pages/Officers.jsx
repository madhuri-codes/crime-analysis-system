import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { officerAPI } from "../services/api";

const initialForm = {
  officer_rank: "",
  badge_number: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  department: "",
  contact_number: "",
};

export default function Officers() {
  const [officers, setOfficers] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const canAdd = user?.user_type === "Admin";

  useEffect(() => {
    const load = async () => {
      try {
        const [officerRes, rankRes] = await Promise.all([
          officerAPI.getOfficers(),
          officerAPI.getOfficerRanks(),
        ]);
        setOfficers(officerRes.data || []);
        setRanks(rankRes.data || []);
      } catch (err) {
        setMessage(err.response?.data?.message || "Unable to load officers.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.officer_rank || !form.first_name || !form.last_name) {
      setMessage("Please fill in rank, first name and last name.");
      return;
    }

    try {
      await officerAPI.createOfficer(form);
      setMessage("Officer added successfully.");
      setForm(initialForm);
      setShowForm(false);
      const response = await officerAPI.getOfficers();
      setOfficers(response.data || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add officer.");
    }
  };

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Officer Management</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            View all officers and add new officers if you have admin access.
          </p>
        </div>
        {canAdd && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
          >
            {showForm ? "Hide Form" : "Add Officer"}
          </button>
        )}
      </div>

      {message && (
        <div style={{ marginBottom: 16, color: "#fbbf24" }}>{message}</div>
      )}

      {showForm && canAdd && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 28, gap: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Rank
            <select name="officer_rank" value={form.officer_rank} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}>
              <option value="">Select rank</option>
              {ranks.map((rank) => (
                <option key={rank.rank_id} value={rank.rank_id}>{rank.rank_name}</option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Badge Number
            <input type="text" name="badge_number" value={form.badge_number} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            First Name
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Last Name
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Date of Birth
            <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Gender
            <select name="gender" value={form.gender} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Department
            <input type="text" name="department" value={form.department} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Contact Number
            <input type="text" name="contact_number" value={form.contact_number} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <button type="submit" style={{ gridColumn: "span 2", background: "#16a34a", color: "#fff", borderRadius: 10, padding: "14px 0", border: "none", cursor: "pointer" }}>
            Save Officer
          </button>
        </form>
      )}

      <div style={{ overflowX: "auto", background: "#0f172a", borderRadius: 16, border: "1px solid #334155" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
              <th style={{ padding: "16px" }}>Badge</th>
              <th style={{ padding: "16px" }}>Name</th>
              <th style={{ padding: "16px" }}>Rank</th>
              <th style={{ padding: "16px" }}>Department</th>
              <th style={{ padding: "16px" }}>Contact</th>
              <th style={{ padding: "16px" }}>DOB</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: 24, color: "#94a3b8" }}>Loading officers...</td></tr>
            ) : officers.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: 24, color: "#94a3b8" }}>No officers found.</td></tr>
            ) : officers.map((officer) => (
              <tr key={officer.officer_id} style={{ borderBottom: "1px solid #1e293b" }}>
                <td style={{ padding: "16px", color: "#e2e8f0" }}>{officer.badge_number}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{officer.first_name} {officer.last_name}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{officer.rank_name || officer.officer_rank}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{officer.department || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{officer.contact_number || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{officer.date_of_birth || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
