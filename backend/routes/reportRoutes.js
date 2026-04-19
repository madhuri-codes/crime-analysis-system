import express from 'express';
import {
  getCrimeTrends,
  getAreaWise,
  getRepeatOffenders,
  getOfficerPerformance,
  getDashboardStats
} from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/crimetrends', authMiddleware, getCrimeTrends);
router.get('/areawise', authMiddleware, getAreaWise);
router.get('/repeatoffenders', authMiddleware, getRepeatOffenders);
router.get('/officerperformance', authMiddleware, getOfficerPerformance);
router.get('/dashboard', authMiddleware, getDashboardStats);

export default router;
