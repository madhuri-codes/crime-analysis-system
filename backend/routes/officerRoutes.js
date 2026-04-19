import express from 'express';
import {
  getAllOfficers,
  getOfficerById,
  getOfficerCases,
  getOfficerRanks,
  addOfficer
} from '../controllers/officerController.js';
import { authMiddleware, authoriseRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllOfficers);
router.get('/ranks', authMiddleware, getOfficerRanks);
router.get('/cases/:officerId', authMiddleware, getOfficerCases);
router.get('/:id', authMiddleware, getOfficerById);
router.post('/addOfficer', authMiddleware, authoriseRoles('Admin'), addOfficer);

export default router;
