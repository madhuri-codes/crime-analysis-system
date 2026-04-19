import pool from '../config/db.js';

export const getAllVictims = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        v.victim_id,
        v.first_name,
        v.last_name,
        v.gender,
        v.contact_number,
        CONCAT(l.city, ', ', l.state) AS location
       FROM VICTIM v
       JOIN LOCATION l ON v.address_id = l.location_id
       ORDER BY v.victim_id DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
