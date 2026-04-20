import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { reportAPI } from '../services/api';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.user_type === 'Admin';

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const response = isAdmin
          ? await reportAPI.getAllReports()
          : await reportAPI.getReports();
        setReports(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load FIR reports.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [isAdmin]);

  return (
    <Layout user={user}>
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ color: '#e2e8f0', fontSize: 32, marginBottom: 8 }}>
              {isAdmin ? 'All FIR Reports' : 'My Filed FIRs'}
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 700, lineHeight: 1.7 }}>
              {isAdmin
                ? 'View all FIRs submitted in the system. Admin users can review and monitor every report.'
                : 'View the FIRs you have submitted. Regular users can only see their own reports here.'}
            </p>
          </div>
          <div style={{ color: '#94a3b8', fontSize: 14, background: '#111827', border: '1px solid #334155', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 6 }}>ACCOUNT</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{user?.username || 'Guest User'}</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>{user?.user_type || 'Civilian'}</div>
          </div>
        </div>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading FIR reports...</div>
        ) : error ? (
          <div style={{ color: '#f87171' }}>{error}</div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', minWidth: 980, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={thStyle}>Report ID</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Reported At</th>
                  <th style={thStyle}>{isAdmin ? 'Reported By' : 'Details'}</th>
                  <th style={thStyle}>Notes</th>
                  <th style={thStyle}>Reviewed By</th>
                  <th style={thStyle}>Reviewed At</th>
                  <th style={thStyle}>Rejection Reason</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={emptyRowStyle}>No FIRs found.</td>
                  </tr>
                ) : reports.map((report) => (
                  <tr key={report.report_id} style={rowStyle}>
                    <td style={tdStyle}>{report.report_id}</td>
                    <td style={tdStyle}>{report.report_status}</td>
                    <td style={tdStyle}>{new Date(report.reported_at).toLocaleString()}</td>
                    <td style={detailsTdStyle}>{isAdmin ? report.reporter : report.notes}</td>
                    <td style={notesTdStyle}>{report.notes}</td>
                    <td style={tdStyle}>{report.reviewed_by_name || '—'}</td>
                    <td style={tdStyle}>{report.reviewed_at ? new Date(report.reviewed_at).toLocaleString() : '—'}</td>
                    <td style={tdStyle}>{report.rejection_reason || '—'}</td>
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

const thStyle = {
  textAlign: 'left',
  padding: '14px 16px',
  color: '#94a3b8',
  borderBottom: '1px solid #1e293b',
  fontSize: 13,
  fontWeight: 600,
};

const tdStyle = {
  padding: '14px 16px',
  color: '#cbd5e1',
  borderBottom: '1px solid #1e293b',
  verticalAlign: 'top',
  fontSize: 13,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const detailsTdStyle = {
  ...tdStyle,
  maxWidth: 180,
};

const notesTdStyle = {
  ...tdStyle,
  maxWidth: 260,
};

const rowStyle = {
  background: '#0f172a',
};

const emptyRowStyle = {
  padding: '24px 16px',
  textAlign: 'center',
  color: '#64748b',
};
