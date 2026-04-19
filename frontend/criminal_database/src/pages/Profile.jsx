import { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div style={{ color: '#94a3b8' }}>Loading profile...</div>;
  if (error) return <div style={{ color: '#f87171' }}>{error}</div>;
  if (!profile) return <div style={{ color: '#94a3b8' }}>No profile data</div>;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#e2e8f0', margin: 0 }}>Profile</h1>
        <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>
          Your account information and statistics.
        </p>
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: 24, borderRadius: 16, border: '1px solid #334155' }}>
        <h2 style={{ color: '#e2e8f0', marginBottom: 16 }}>Basic Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Username</label>
            <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.username}</p>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Email</label>
            <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.email}</p>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>User Type</label>
            <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.user_type}</p>
          </div>
          {profile.created_at && (
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14 }}>Joined</label>
              <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {profile.user_type === 'Officer' && (
          <>
            <h2 style={{ color: '#e2e8f0', margin: '32px 0 16px' }}>Officer Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 14 }}>Full Name</label>
                <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.first_name} {profile.last_name}</p>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 14 }}>Badge Number</label>
                <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.badge_number}</p>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 14 }}>Rank</label>
                <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.officer_rank}</p>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: 14 }}>Station ID</label>
                <p style={{ color: '#e2e8f0', margin: '4px 0' }}>{profile.station_id}</p>
              </div>
            </div>

            <h2 style={{ color: '#e2e8f0', margin: '32px 0 16px' }}>Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ backgroundColor: '#0f172a', padding: 16, borderRadius: 8, border: '1px solid #334155' }}>
                <h3 style={{ color: '#e2e8f0', margin: 0, fontSize: 18 }}>{profile.crimesInvolved}</h3>
                <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 14 }}>Crimes Involved In</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: 16, borderRadius: 8, border: '1px solid #334155' }}>
                <h3 style={{ color: '#e2e8f0', margin: 0, fontSize: 18 }}>{profile.criminalsArrested}</h3>
                <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 14 }}>Criminals Arrested</p>
              </div>
            </div>
          </>
        )}

        {profile.user_type === 'Admin' && (
          <div style={{ marginTop: 32 }}>
            <h2 style={{ color: '#e2e8f0', marginBottom: 16 }}>Admin Privileges</h2>
            <p style={{ color: '#94a3b8' }}>You have full administrative access to the system.</p>
          </div>
        )}

        {profile.user_type === 'Civilian' && (
          <div style={{ marginTop: 32 }}>
            <h2 style={{ color: '#e2e8f0', marginBottom: 16 }}>Account Status</h2>
            <p style={{ color: '#94a3b8' }}>Standard user account with access to public crime data.</p>
          </div>
        )}
      </div>
    </div>
  );
}