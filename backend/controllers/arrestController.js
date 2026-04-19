import pool from '../config/db.js';

export const getAllArrests = async (req, res) => {
  try {
    const [arrests] = await pool.query(
      `SELECT
         a.arrest_id,
         CONCAT('AR-', LPAD(a.arrest_id, 6, '0')) AS case_number,
         DATE_FORMAT(a.arrest_date, '%Y-%m-%d') AS arrest_date,
         TIME_FORMAT(a.arrest_time, '%H:%i') AS arrest_time,
         CONCAT(o.first_name, ' ', o.last_name) AS officer_name,
         o.officer_id,
         ct.crime_type_name AS crime_type,
         c.crime_id,
         LEFT(c.crime_description, 200) AS incident,
         CONCAT_WS(', ', l.address1, l.city, l.state) AS location,
         a.bail_status AS status,
         a.charge AS outcome,
         CONCAT(cr.first_name, ' ', cr.last_name) AS suspect_name
       FROM ARREST a
       LEFT JOIN OFFICER o ON a.officer_id = o.officer_id
       LEFT JOIN CRIME c ON a.crime_id = c.crime_id
       LEFT JOIN CRIME_TYPE ct ON c.crime_type_id = ct.crime_type_id
       LEFT JOIN LOCATION l ON a.arrest_location_id = l.location_id
       LEFT JOIN CRIMINAL cr ON a.criminal_id = cr.criminal_id
       ORDER BY a.arrest_date DESC, a.arrest_time DESC`
    );
    res.json(arrests);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getArrestById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT
         a.arrest_id,
         CONCAT('AR-', LPAD(a.arrest_id, 6, '0')) AS case_number,
         DATE_FORMAT(a.arrest_date, '%Y-%m-%d') AS arrest_date,
         TIME_FORMAT(a.arrest_time, '%H:%i') AS arrest_time,
         CONCAT(o.first_name, ' ', o.last_name) AS officer_name,
         o.officer_id,
         ct.crime_type_name AS crime_type,
         c.crime_id,
         c.crime_description AS related_incident,
         CONCAT_WS(', ', al.address1, al.city, al.state, al.country) AS arrest_location,
         a.bail_status AS status,
         a.charge AS outcome,
         CONCAT(cr.first_name, ' ', cr.last_name) AS suspect_name,
         a.arrest_location_id,
         a.crime_id
       FROM ARREST a
       LEFT JOIN OFFICER o ON a.officer_id = o.officer_id
       LEFT JOIN CRIME c ON a.crime_id = c.crime_id
       LEFT JOIN CRIME_TYPE ct ON c.crime_type_id = ct.crime_type_id
       LEFT JOIN LOCATION al ON a.arrest_location_id = al.location_id
       LEFT JOIN CRIMINAL cr ON a.criminal_id = cr.criminal_id
       WHERE a.arrest_id = ?
       LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Arrest not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
