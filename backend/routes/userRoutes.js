import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/updateprofile', authMiddleware, updateProfile);
router.put('/changepassword', authMiddleware, changePassword);

export default router;
