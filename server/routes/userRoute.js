import express from 'express';
import { getMe } from '../controllers/user.js';
import { createUser } from '../controllers/user.js';
import { loginUser } from '../controllers/user.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/create').post(createUser)
router.route('/login').post(loginUser)
router.get('/me',protect, getMe)
export default router; 