import pool from '../config/db.js';

export const createUserReport = async (req, res) => {
  const {
    incident_date,
    location,
    crime_type,
    suspect_description,
    details,
    witness_info,
  } = req.body;

  if (!incident_date || !location || !crime_type || !details) {
    return res.status(400).json({ message: 'Please fill in incident date, location, crime type, and details.' });
  }

  const userType = req.user?.user_type || 'Civilian';
  const submittedBy = req.user?.user_id;

  const formattedNotes = `Civilian reported ${crime_type.toLowerCase()} on ${incident_date} at ${location}.` +
    `${suspect_description ? ` Suspect: ${suspect_description}.` : ''}` +
    ` ${details.trim()}` +
    `${witness_info ? ` Witness details: ${witness_info.trim()}.` : ''}`;

  try {
    await pool.query(
      `INSERT INTO USER_REPORTED_CRIME (user_id, notes) VALUES (?, ?)`,
      [submittedBy, formattedNotes]
    );

    res.status(201).json({ message: 'FIR submitted successfully.' });
  } catch (error) {
    console.error('Create FIR Error:', error);
    res.status(500).json({ message: 'Could not submit FIR. Please try again later.' });
  }
};

export const getUserReports = async (req, res) => {
  const userId = req.user?.user_id;

  try {
    const [rows] = await pool.query(
      `SELECT urc.report_id,
              urc.reported_at,
              urc.report_status,
              urc.rejection_reason,
              urc.reviewed_at,
              urc.notes,
              urc.reviewed_by,
              u.username AS reporter,
              u.user_type AS reporter_type,
              CONCAT(o.first_name, ' ', o.last_name) AS reviewed_by_name
       FROM USER_REPORTED_CRIME urc
       JOIN USER u ON urc.user_id = u.user_id
       LEFT JOIN OFFICER o ON urc.reviewed_by = o.officer_id
       WHERE urc.user_id = ?
       ORDER BY urc.reported_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Get User Reports Error:', error);
    res.status(500).json({ message: 'Could not fetch your FIR reports right now.' });
  }
};

export const getAllUserReports = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT urc.report_id,
              urc.reported_at,
              urc.report_status,
              urc.rejection_reason,
              urc.reviewed_at,
              urc.notes,
              urc.reviewed_by,
              u.username AS reporter,
              u.user_type AS reporter_type,
              CONCAT(o.first_name, ' ', o.last_name) AS reviewed_by_name
       FROM USER_REPORTED_CRIME urc
       JOIN USER u ON urc.user_id = u.user_id
       LEFT JOIN OFFICER o ON urc.reviewed_by = o.officer_id
       ORDER BY urc.reported_at DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error('Get All Reports Error:', error);
    res.status(500).json({ message: 'Could not fetch all FIR reports right now.' });
  }
};
