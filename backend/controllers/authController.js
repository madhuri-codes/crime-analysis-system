import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password, user_type, officer_id } = req.body;

    // check if user already exists
    const [existing] = await pool.query(
      'SELECT * FROM USER WHERE email = ?', [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert into DB
    await pool.query(
      `INSERT INTO USER (officer_id, username, password_hash, email, user_type, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [officer_id, username, hashedPassword, email, user_type]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const [users] = await pool.query(
      'SELECT * FROM USER WHERE email = ?', [email]
    );
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // create token
    const token = jwt.sign(
      { user_id: user.user_id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        user_type: user.user_type
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGOUT (frontend just deletes token, but we acknowledge it)
export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
