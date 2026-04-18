import pool from '../config/db.js';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT user_id, username, email, user_type, is_active FROM USER'
    );
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
  try {
    const { username, email } = req.body;
    await pool.query(
      'UPDATE USER SET username = ?, email = ? WHERE user_id = ?',
      [username, email, req.user.user_id]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CHANGE password
export const changePassword = async (req, res) => {
  try {
    const { new_password } = req.body;
    const hashed = await bcrypt.hash(new_password, 10);
    await pool.query(
      'UPDATE USER SET password_hash = ? WHERE user_id = ?',
      [hashed, req.user.user_id]
    );
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
