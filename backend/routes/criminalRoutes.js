import express from 'express';
import { authMiddleware, authoriseRoles } from '../middleware/authMiddleware.js';
import { getAllCriminals, addCriminal, updateCriminal } from '../controllers/criminalController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllCriminals);
router.post('/add', authMiddleware, authoriseRoles('Officer', 'Admin'), addCriminal);
router.put('/update/:id', authMiddleware, authoriseRoles('Officer', 'Admin'), updateCriminal);

export default router;
