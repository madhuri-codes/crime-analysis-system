import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { reportAPI } from '../services/api';

const fieldStyle = {
  width: '100%',
  padding: 14,
  borderRadius: 12,
  border: '1px solid #334155',
  background: '#0f172a',
  color: '#e2e8f0',
  resize: 'vertical'
};

export default function Report() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [form, setForm] = useState({
    incident_date: '',
    location: '',
    crime_type: '',
    suspect_description: '',
    details: '',
    witness_info: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.incident_date || !form.location || !form.crime_type || !form.details) {
      setError('Incident date, location, crime type, and details are all required.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await reportAPI.createReport(form);
      setMessage('FIR submitted successfully. The police review queue has received your report.');
      setForm({
        incident_date: '',
        location: '',
        crime_type: '',
        suspect_description: '',
        details: '',
        witness_info: ''
      });
      setTimeout(() => navigate('/dashboard'), 1400);
    } catch (err) {
      setError(err.response?.data?.message || 'There was a problem submitting the FIR. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout user={user}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 28 }}>
          <div>
            <h1 style={{ color: '#e2e8f0', fontSize: 32, marginBottom: 8 }}>Register FIR</h1>
            <p style={{ color: '#94a3b8', maxWidth: 620, lineHeight: 1.7 }}>
              File a First Information Report with structured incident details. Your submission will be saved as a pending FIR report for officer review.
            </p>
          </div>
          <div style={{ color: '#94a3b8', fontSize: 14, background: '#111827', border: '1px solid #334155', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 6 }}>SUBMITTED BY</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{user?.username || 'Guest User'}</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>{user?.user_type || 'Civilian'}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
              Incident Date
              <input type="date" name="incident_date" value={form.incident_date} onChange={handleChange} style={fieldStyle} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
              Crime Location
              <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Example: BTM Layout, Bangalore" style={fieldStyle} />
            </label>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
            Crime Type
            <input type="text" name="crime_type" value={form.crime_type} onChange={handleChange} placeholder="Example: Burglary, Assault, Fraud" style={fieldStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
            Suspect Description / Involved Persons
            <input type="text" name="suspect_description" value={form.suspect_description} onChange={handleChange} placeholder="Example: White sedan, 4 people, male with red jacket" style={fieldStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
            Incident Details
            <textarea rows="6" name="details" value={form.details} onChange={handleChange} placeholder="Describe what happened, when it happened, and any evidence or witnesses." style={fieldStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#cbd5e1', fontSize: 13 }}>
            Witness / Evidence Notes (optional)
            <textarea rows="4" name="witness_info" value={form.witness_info} onChange={handleChange} placeholder="Example: Two witnesses, CCTV footage available..." style={fieldStyle} />
          </label>

          {error && <div style={{ color: '#f87171', fontSize: 14 }}>{error}</div>}
          {message && <div style={{ color: '#22c55e', fontSize: 14 }}>{message}</div>}

          <button type="submit" disabled={loading} style={{
            background: '#3b82f6', color: 'white', border: 'none', borderRadius: 14,
            padding: '16px 22px', cursor: 'pointer', fontSize: 15, fontWeight: 700,
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Submitting FIR...' : 'Submit FIR'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
