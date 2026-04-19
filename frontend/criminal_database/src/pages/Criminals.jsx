import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { criminalAPI } from "../services/api";

const initialForm = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  nationality: "",
  status: "",
  address_id: "",
  photo_url: "",
};

export default function Criminals() {
  const [criminals, setCriminals] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const canEdit = ["Officer", "Admin"].includes(user?.user_type);

  useEffect(() => {
    const loadCriminals = async () => {
      try {
        const res = await criminalAPI.getCriminals();
        setCriminals(res.data || []);
      } catch (err) {
        setMessage(err.response?.data?.message || "Unable to load criminals.");
      } finally {
        setLoading(false);
      }
    };
    loadCriminals();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setSelectedId(null);
    setMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.first_name || !form.last_name) {
      setMessage("First and last name are required.");
      return;
    }

    try {
      if (selectedId) {
        await criminalAPI.updateCriminal(selectedId, form);
        setMessage("Criminal updated successfully.");
      } else {
        await criminalAPI.addCriminal(form);
        setMessage("Criminal added successfully.");
      }
      const res = await criminalAPI.getCriminals();
      setCriminals(res.data || []);
      resetForm();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save criminal.");
    }
  };

  const handleEdit = (criminal) => {
    setSelectedId(criminal.criminal_id);
    setForm({
      first_name: criminal.first_name || "",
      last_name: criminal.last_name || "",
      date_of_birth: criminal.date_of_birth || "",
      gender: criminal.gender || "",
      nationality: criminal.nationality || "",
      status: criminal.status || "",
      address_id: criminal.address_id || "",
      photo_url: criminal.photo_url || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout user={user}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, color: "#e2e8f0" }}>Criminals</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Browse criminal records and update profiles if you have officer access.
          </p>
        </div>
      </div>

      {message && (
        <div style={{ marginBottom: 16, color: "#fbbf24" }}>{message}</div>
      )}

      {canEdit ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: 28, gap: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
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
            Nationality
            <input type="text" name="nationality" value={form.nationality} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Status
            <input type="text" name="status" value={form.status} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Address ID
            <input type="text" name="address_id" value={form.address_id} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            Photo URL
            <input type="text" name="photo_url" value={form.photo_url} onChange={handleChange} style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" }} />
          </label>
          <button type="submit" style={{ gridColumn: "span 2", background: "#16a34a", color: "#fff", borderRadius: 10, padding: "14px 0", border: "none", cursor: "pointer" }}>
            {selectedId ? "Update Criminal" : "Add Criminal"}
          </button>
        </form>
      ) : (
        <div style={{ marginBottom: 28, padding: 20, borderRadius: 16, background: "#111827", border: "1px solid #334155", color: "#94a3b8" }}>
          Only officers and administrators may add or edit criminal records.
        </div>
      )}

      <div style={{ overflowX: "auto", background: "#0f172a", borderRadius: 16, border: "1px solid #334155" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8", borderBottom: "1px solid #334155" }}>
              <th style={{ padding: "16px" }}>ID</th>
              <th style={{ padding: "16px" }}>Name</th>
              <th style={{ padding: "16px" }}>DOB</th>
              <th style={{ padding: "16px" }}>Gender</th>
              <th style={{ padding: "16px" }}>Nationality</th>
              <th style={{ padding: "16px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 24, color: "#94a3b8" }}>Loading criminal records...</td></tr>
            ) : criminals.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 24, color: "#94a3b8" }}>No criminals found.</td></tr>
            ) : criminals.map((criminal) => (
              <tr key={criminal.criminal_id} style={{ borderBottom: "1px solid #1e293b" }}>
                <td style={{ padding: "16px", color: "#e2e8f0" }}>{criminal.criminal_id}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{criminal.first_name} {criminal.last_name}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{criminal.date_of_birth || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{criminal.gender || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{criminal.nationality || "—"}</td>
                <td style={{ padding: "16px", color: "#cbd5e1" }}>{criminal.status || "—"}</td>
                <td style={{ padding: "16px" }}>
                  {canEdit ? (
                    <button
                      onClick={() => handleEdit(criminal)}
                      style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                  ) : (
                    <span style={{ color: "#64748b" }}>No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
