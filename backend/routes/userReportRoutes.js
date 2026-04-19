import express from 'express';
import { authMiddleware, authoriseRoles } from '../middleware/authMiddleware.js';
import {
  createUserReport,
  getUserReports,
  getAllUserReports
} from '../controllers/userReportController.js';
import {
  getDashboardStats,
  getRecentCrimes
} from '../controllers/reportController.js';

const router = express.Router();

router.post('/', authMiddleware, createUserReport);
router.get('/', authMiddleware, getUserReports);
router.get('/all', authMiddleware, authoriseRoles('Admin', 'Officer'), getAllUserReports);
router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/recent', authMiddleware, getRecentCrimes);

export default router;
