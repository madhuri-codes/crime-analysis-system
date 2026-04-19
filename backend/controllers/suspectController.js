import pool from '../config/db.js';

export const getAllSuspects = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        s.suspect_id,
        s.first_name,
        s.last_name,
        s.gender,
        s.contact_number,
        s.status,
        LEFT(s.suspect_description, 220) AS suspect_description,
        CONCAT(l.city, ', ', l.state) AS location
       FROM SUSPECT s
       JOIN LOCATION l ON s.address_id = l.location_id
       ORDER BY FIELD(s.status, 'Under Investigation', 'Wanted', 'Arrested', 'Cleared'), s.suspect_id DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
