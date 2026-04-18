import pool from '../config/db.js';

// Crime trends - count of crimes per month
export const getCrimeTrends = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        MONTH(crime_date) as month,
        YEAR(crime_date) as year,
        COUNT(*) as total_crimes
       FROM CRIME
       GROUP BY YEAR(crime_date), MONTH(crime_date)
       ORDER BY year, month`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Area wise crimes
export const getAreaWise = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        l.city,
        l.district,
        COUNT(c.crime_id) as total_crimes
       FROM CRIME c
       JOIN LOCATION l ON c.location_id = l.location_id
       GROUP BY l.city, l.district
       ORDER BY total_crimes DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Repeat offenders - criminals with more than 1 crime
export const getRepeatOffenders = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        cr.criminal_id,
        cr.first_name,
        cr.last_name,
        cr.status,
        COUNT(cc.crime_id) as total_crimes
       FROM CRIMINAL cr
       JOIN CRIMINAL_CRIME cc ON cr.criminal_id = cc.criminal_id
       GROUP BY cr.criminal_id
       HAVING total_crimes > 1
       ORDER BY total_crimes DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Officer performance - cases handled per officer
export const getOfficerPerformance = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        o.officer_id,
        o.first_name,
        o.last_name,
        o.department,
        COUNT(oc.crime_id) as cases_handled
       FROM OFFICER o
       LEFT JOIN OFFICER_CRIME oc ON o.officer_id = oc.officer_id
       GROUP BY o.officer_id
       ORDER BY cases_handled DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
