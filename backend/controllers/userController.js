import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT 
        u.user_id, 
        u.username, 
        u.email, 
        u.user_type, 
        o.first_name AS officer_first_name, 
        o.last_name AS officer_last_name,
        o.badge_number,
        o.officer_rank
      FROM USER u
      LEFT JOIN OFFICER o ON u.officer_id = o.officer_id
    `);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET single user
export const getUserById = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT user_id, username, email, user_type, is_active FROM USER WHERE user_id = ?',
      [req.params.id]
    );
    if (user.length === 0)
      return res.status(404).json({ message: 'User not found' });
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE user profile
export const updateProfile = async (req, res) => {
  const { username, email } = req.body; 
  const userId = req.user.user_id;     

  try {
    // 1. Check if email is already taken by someone ELSE
    const [existing] = await pool.query(
      'SELECT user_id FROM USER WHERE email = ? AND user_id != ?',
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already in use by another account' });
    }

    await pool.query(
      'UPDATE USER SET username = ?, email = ? WHERE user_id = ?',
      [username, email, userId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CHANGE password
export const changePassword = async (req, res) => {
  const { current_password, new_password } = req.body;

  try {
    // 1. Get the current hash from DB
    const [user] = await pool.query('SELECT password_hash FROM USER WHERE user_id = ?', [req.user.user_id]);
    
    // 2. Verify current password
    const isMatch = await bcrypt.compare(current_password, user[0].password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Current password incorrect' });

    // 3. Hash and save new password
    const hashed = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE USER SET password_hash = ? WHERE user_id = ?', [hashed, req.user.user_id]);
    
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET user profile with stats for officers
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Get user data with officer details if applicable
    const [user] = await pool.query(`
      SELECT 
        u.user_id, 
        u.username, 
        u.email, 
        u.user_type, 
        u.officer_id,
        o.first_name, 
        o.last_name,
        o.badge_number,
        o.officer_rank,
        o.station_id
      FROM USER u
      LEFT JOIN OFFICER o ON u.officer_id = o.officer_id
      WHERE u.user_id = ?
    `, [userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user[0];

    // Add stats for officers
    if (profile.user_type === 'Officer') {
      // Crimes involved
      const [crimes] = await pool.query(
        'SELECT COUNT(*) as count FROM OFFICER_CRIME WHERE officer_id = ?',
        [profile.officer_id]
      );
      profile.crimesInvolved = crimes[0].count;

      // Criminals arrested (distinct criminals from crimes the officer was involved in)
      const [arrests] = await pool.query(`
        SELECT COUNT(DISTINCT cs.criminal_id) as count 
        FROM CRIME_SUSPECT cs 
        JOIN OFFICER_CRIME oc ON cs.crime_id = oc.crime_id 
        WHERE oc.officer_id = ?
      `, [profile.officer_id]);
      profile.criminalsArrested = arrests[0].count;
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
