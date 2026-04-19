import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllSuspects } from '../controllers/suspectController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllSuspects);

export default router;
