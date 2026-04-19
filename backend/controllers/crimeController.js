import pool from '../config/db.js';

export const getAllCrimes = async (req, res) => {
  try {
    const [crimes] = await pool.query(
      `SELECT c.crime_id,
              DATE_FORMAT(c.crime_date, '%Y-%m-%d') AS crime_date,
              TIME_FORMAT(c.crime_time, '%H:%i') AS crime_time,
              ct.crime_type_name,
              c.crime_status,
              LEFT(c.crime_description, 200) AS crime_description,
              l.city,
              l.district,
              l.state,
              l.country,
              l.latitude,
              l.longitude,
              GROUP_CONCAT(DISTINCT CONCAT(cr.first_name, ' ', cr.last_name) SEPARATOR ', ') AS criminals,
              GROUP_CONCAT(DISTINCT CONCAT(o.first_name, ' ', o.last_name) SEPARATOR ', ') AS officers
       FROM CRIME c
       JOIN CRIME_TYPE ct ON c.crime_type_id = ct.crime_type_id
       JOIN LOCATION l ON c.location_id = l.location_id
       LEFT JOIN CRIMINAL_CRIME cc ON c.crime_id = cc.crime_id
       LEFT JOIN CRIMINAL cr ON cc.criminal_id = cr.criminal_id
       LEFT JOIN OFFICER_CRIME oc ON c.crime_id = oc.crime_id
       LEFT JOIN OFFICER o ON oc.officer_id = o.officer_id
       GROUP BY c.crime_id
       ORDER BY c.crime_date DESC, c.crime_time DESC`
    );
    res.json(crimes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getCrimeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT c.crime_id,
              DATE_FORMAT(c.crime_date, '%Y-%m-%d') AS crime_date,
              TIME_FORMAT(c.crime_time, '%H:%i') AS crime_time,
              ct.crime_type_name,
              c.crime_status,
              c.crime_description,
              c.damage_estimate,
              l.location_id,
              l.address1,
              l.address2,
              l.address3,
              l.district,
              l.city,
              l.state,
              l.country,
              l.pincode,
              l.latitude,
              l.longitude,
              GROUP_CONCAT(DISTINCT CONCAT(cr.first_name, ' ', cr.last_name, ' (', cc.criminal_role, ')') SEPARATOR '||') AS criminals,
              GROUP_CONCAT(DISTINCT CONCAT(o.first_name, ' ', o.last_name, ' (', oc.officer_role, ')') SEPARATOR '||') AS officers,
              GROUP_CONCAT(DISTINCT CONCAT(s.first_name, ' ', s.last_name, ' [', cs.notes, ']') SEPARATOR '||') AS suspects,
              GROUP_CONCAT(DISTINCT CONCAT(v.first_name, ' ', v.last_name, ' [', cv.injury_level, ']') SEPARATOR '||') AS victims
       FROM CRIME c
       JOIN CRIME_TYPE ct ON c.crime_type_id = ct.crime_type_id
       JOIN LOCATION l ON c.location_id = l.location_id
       LEFT JOIN CRIMINAL_CRIME cc ON c.crime_id = cc.crime_id
       LEFT JOIN CRIMINAL cr ON cc.criminal_id = cr.criminal_id
       LEFT JOIN OFFICER_CRIME oc ON c.crime_id = oc.crime_id
       LEFT JOIN OFFICER o ON oc.officer_id = o.officer_id
       LEFT JOIN CRIME_SUSPECT cs ON c.crime_id = cs.crime_id
       LEFT JOIN SUSPECT s ON cs.suspect_id = s.suspect_id
       LEFT JOIN CRIME_VICTIM cv ON c.crime_id = cv.crime_id
       LEFT JOIN VICTIM v ON cv.victim_id = v.victim_id
       WHERE c.crime_id = ?
       GROUP BY c.crime_id`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Crime not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
