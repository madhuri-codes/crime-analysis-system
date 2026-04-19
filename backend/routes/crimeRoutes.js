import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllCrimes, getCrimeById } from '../controllers/crimeController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllCrimes);
router.get('/:id', authMiddleware, getCrimeById);

export default router;
