import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (req, res) => {
  const { officer_id, username, email, password, user_type } = req.body;

  // 1. NON-EMPTY CHECK: Ensure basic fields aren't blank
  if (!username || username.trim() === "" || !password || password.trim() === "" || !email || email.trim() === "") {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  // 2. LOGIC CHECK: If the role is 'Officer' or 'Admin', they MUST provide an officer_id
  if ((user_type === 'Officer' || user_type === 'Admin') && !officer_id) {
    return res.status(400).json({ message: "Police accounts must be linked to a valid Officer ID." });
  }

  try {
    // 3. AVAILABILITY CHECK: Is username, email, or Officer ID already taken?
    const [existingUsers] = await pool.query(
      `SELECT username, email, officer_id FROM USER 
       WHERE username = ? OR email = ? OR (officer_id = ? AND officer_id IS NOT NULL)`,
      [username, email, officer_id]
    );

    if (existingUsers.length > 0) {
      const match = existingUsers[0];
      if (match.username === username) return res.status(400).json({ message: "Username already taken." });
      if (match.email === email) return res.status(400).json({ message: "Email already registered." });
      if (match.officer_id == officer_id) return res.status(400).json({ message: "This Officer already has an account." });
    }

    // 4. EXISTENCE CHECK: Does this officer actually exist in the physical OFFICER table?
    if (officer_id) {
      const [officerExists] = await pool.query('SELECT officer_id FROM OFFICER WHERE officer_id = ?', [officer_id]);
      if (officerExists.length === 0) {
        return res.status(404).json({ message: "Invalid Officer ID. No such officer found in records." });
      }
    }

    // 5. SECURITY: Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. EXECUTION: Finally insert the data
    await pool.query(
      `INSERT INTO USER (officer_id, username, password_hash, user_type, email, is_active) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      [officer_id || null, username, hashedPassword, user_type, email]
    );

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const [users] = await pool.query('SELECT * FROM USER WHERE email = ?', [email]);
    const user = users[0];

    // 2. Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 3. Compare the plain password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 4. Check if the account is active
    if (!user.is_active) {
      return res.status(403).json({ message: "Account is deactivated." });
    }

    // 5. Create the JWT Token
    // We include user_type and officer_id so our middleware can use them later
    const token = jwt.sign(
      { 
        user_id: user.user_id, 
        user_type: user.user_type, 
        officer_id: user.officer_id 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token lasts for 24 hours
    );

    // 6. Send the token to the client
    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        role: user.user_type
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ 
      message: "Logged out successfully." 
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "An error occurred during logout." });
  }
}