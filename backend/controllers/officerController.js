import pool from '../config/db.js';

// GET all officers
export const getAllOfficers = async (req, res) => {
  try {
    const [officers] = await pool.query(
      `SELECT o.officer_id, o.officer_rank, o.badge_number, o.first_name, o.last_name,
              DATE_FORMAT(o.date_of_birth, '%Y-%m-%d') AS date_of_birth,
              o.gender, o.department, o.contact_number,
              r.rank_name, r.access_level
       FROM OFFICER o
       LEFT JOIN OFFICER_RANK r ON o.officer_rank = r.rank_id`
    );
    res.json(officers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET single officer
export const getOfficerById = async (req, res) => {
  try {
    const [officer] = await pool.query(
      `SELECT o.*, r.rank_name 
       FROM OFFICER o 
       LEFT JOIN OFFICER_RANK r ON o.officer_rank = r.rank_id
       WHERE o.officer_id = ?`,
      [req.params.id]
    );
    if (officer.length === 0)
      return res.status(404).json({ message: 'Officer not found' });
    res.json(officer[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET officer cases
export const getOfficerCases = async (req, res) => {
  try {
    const [cases] = await pool.query(
      `SELECT c.* FROM CRIME c
       JOIN OFFICER_CRIME oc ON c.crime_id = oc.crime_id
       WHERE oc.officer_id = ?`,
      [req.params.officerId]
    );
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET officer ranks
export const getOfficerRanks = async (req, res) => {
  try {
    const [ranks] = await pool.query(
      `SELECT rank_id, rank_name, access_level FROM OFFICER_RANK ORDER BY access_level DESC`
    );
    res.json(ranks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ADD officer
export const addOfficer = async (req, res) => {
  const {
      officer_rank, badge_number, first_name,
      last_name, date_of_birth, gender,
      department, contact_number
    } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO OFFICER 
       (officer_rank, badge_number, first_name, last_name, date_of_birth, gender, department, contact_number)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [officer_rank, badge_number, first_name, last_name,
       date_of_birth, gender, department, contact_number]
    );
    res.status(201).json({ 
      message: 'Officer added successfully',
      officer_id: result.insertId
     });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
