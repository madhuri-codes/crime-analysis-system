import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllEvidence } from '../controllers/evidenceController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllEvidence);

export default router;
