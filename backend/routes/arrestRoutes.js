import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllArrests, getArrestById } from '../controllers/arrestController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllArrests);
router.get('/:id', authMiddleware, getArrestById);

export default router;
