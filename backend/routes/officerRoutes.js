import express from 'express';
import {
  getAllOfficers,
  getOfficerById,
  getOfficerCases,
  addOfficer
} from '../controllers/officerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllOfficers);
router.get('/:id', authMiddleware, getOfficerById);
router.get('/cases/:officerId', authMiddleware, getOfficerCases);
router.post('/', authMiddleware, addOfficer);

export default router;
