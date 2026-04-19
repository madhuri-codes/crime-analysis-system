import pool from '../config/db.js';

export const getLocations = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT location_id, address1, address2, district, city, state, country, pincode, latitude, longitude
       FROM LOCATION
       WHERE latitude IS NOT NULL AND longitude IS NOT NULL`
    );
    res.json(rows);
  } catch (error) {
    console.error('Location fetch error:', error);
    res.status(500).json({ message: 'Failed to load locations', error: error.message });
  }
};
