import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword
} from '../controllers/userController.js';
import { authMiddleware, authoriseRoles} from '../middleware/authMiddleware.js';

const router = express.Router();

// ADMIN routes only
router.get('/', authMiddleware, authoriseRoles('Admin'), getAllUsers);
router.get('/:id', authMiddleware, authoriseRoles('Admin'), getUserById);

// routes open to all

router.put('/updateprofile', authMiddleware, updateProfile);
router.patch('/changepassword', authMiddleware, changePassword);

export default router;
