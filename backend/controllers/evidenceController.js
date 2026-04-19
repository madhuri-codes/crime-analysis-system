import pool from '../config/db.js';

export const getAllEvidence = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        e.evidence_id,
        e.crime_id,
        e.evidence_type,
        LEFT(e.evidence_description, 220) AS evidence_description,
        DATE_FORMAT(e.collected_date, '%Y-%m-%d') AS collected_date,
        TIME_FORMAT(e.collected_time, '%H:%i') AS collected_time,
        e.storage_location,
        CONCAT(o.first_name, ' ', o.last_name) AS collected_by
       FROM EVIDENCE e
       LEFT JOIN OFFICER o ON e.collected_by = o.officer_id
       ORDER BY e.collected_date DESC, e.collected_time DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
