import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (req, res) => {
  const { officer_id, username, email, password, user_type } = req.body;

  console.log("Registration attempt:", { username, email, user_type, officer_id });

  // 1. NON-EMPTY CHECK: Ensure basic fields aren't blank
  if (!username || username.trim() === "" || !password || password.trim() === "" || !email || email.trim() === "") {
    console.log("Registration failed: Missing required fields");
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  // 2. LOGIC CHECK: If the role is 'Officer' or 'Admin', they MUST provide an officer_id
  if ((user_type === 'Officer' || user_type === 'Admin') && !officer_id) {
    console.log("Registration failed: Officer/Admin role without officer_id");
    return res.status(400).json({ message: "Police accounts must be linked to a valid Officer ID." });
  }

  try {
    // 3. AVAILABILITY CHECK: Is username, email, or Officer ID already taken?
    console.log("Checking for existing users...");
    const [existingUsers] = await pool.query(
      `SELECT username, email, officer_id FROM USER 
       WHERE username = ? OR email = ? OR (officer_id = ? AND officer_id IS NOT NULL)`,
      [username, email, officer_id]
    );

    if (existingUsers.length > 0) {
      const match = existingUsers[0];
      if (match.username === username) {
        console.log("Registration failed: Username already taken");
        return res.status(400).json({ message: "Username already taken." });
      }
      if (match.email === email) {
        console.log("Registration failed: Email already registered");
        return res.status(400).json({ message: "Email already registered." });
      }
      if (match.officer_id == officer_id) {
        console.log("Registration failed: Officer already has an account");
        return res.status(400).json({ message: "This Officer already has an account." });
      }
    }

    // 4. EXISTENCE CHECK: Does this officer actually exist in the physical OFFICER table?
    if (officer_id) {
      console.log("Checking if officer exists...");
      const [officerExists] = await pool.query('SELECT officer_id FROM OFFICER WHERE officer_id = ?', [officer_id]);
      if (officerExists.length === 0) {
        console.log("Registration failed: Invalid Officer ID");
        return res.status(404).json({ message: "Invalid Officer ID. No such officer found in records." });
      }
    }

    // 5. SECURITY: Hash the password
    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. EXECUTION: Finally insert the data
    console.log("Inserting user into database...");
    await pool.query(
      `INSERT INTO USER (officer_id, username, password_hash, user_type, email, is_active) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      [officer_id || null, username, hashedPassword, user_type, email]
    );

    console.log("Registration successful for user:", username);
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Registration Error - Full Details:", error);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    res.status(500).json({ message: "An internal server error occurred. Check backend logs." });
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
      console.log("Login attempt - User not found:", email);
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 3. Compare the plain password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log("Login attempt - Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 4. Check if the account is active
    if (!user.is_active) {
      console.log("Login attempt - Account inactive:", email);
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

    console.log("Login successful for user:", email);

    // 6. Send the token to the client
    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        user_type: user.user_type
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