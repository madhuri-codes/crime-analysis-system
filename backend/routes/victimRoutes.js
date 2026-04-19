import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllVictims } from '../controllers/victimController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllVictims);

export default router;
