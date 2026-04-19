import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  getProfile
} from '../controllers/userController.js';
import { authMiddleware, authoriseRoles} from '../middleware/authMiddleware.js';

const router = express.Router();

// ADMIN routes only
router.get('/', authMiddleware, authoriseRoles('Admin'), getAllUsers);

// routes open to all
router.get('/profile', authMiddleware, getProfile);
router.put('/updateprofile', authMiddleware, updateProfile);
router.patch('/changepassword', authMiddleware, changePassword);

// ADMIN routes only
router.get('/:id', authMiddleware, authoriseRoles('Admin'), getUserById);

export default router;
