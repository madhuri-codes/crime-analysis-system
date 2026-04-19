import pool from '../config/db.js';

export const getAllCriminals = async (req, res) => {
  try {
    const [criminals] = await pool.query(
      `SELECT criminal_id, first_name, last_name,
              DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth,
              gender, nationality, status
       FROM CRIMINAL`
    );
    res.json(criminals);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const addCriminal = async (req, res) => {
  const { first_name, last_name, date_of_birth, gender, nationality, address_id, status, photo_url } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO CRIMINAL (first_name, last_name, date_of_birth, gender, nationality, address_id, status, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        date_of_birth || null,
        gender || null,
        nationality || null,
        address_id || null,
        status || null,
        photo_url || null,
      ]
    );
    res.status(201).json({ message: 'Criminal added successfully', criminal_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateCriminal = async (req, res) => {
  const { first_name, last_name, date_of_birth, gender, nationality, address_id, status, photo_url } = req.body;
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `UPDATE CRIMINAL SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, nationality = ?, address_id = ?, status = ?, photo_url = ?
       WHERE criminal_id = ?`,
      [
        first_name,
        last_name,
        date_of_birth || null,
        gender || null,
        nationality || null,
        address_id || null,
        status || null,
        photo_url || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Criminal not found' });
    }
    res.json({ message: 'Criminal updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
