import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/drivers', authMiddleware.verifyToken, authController.getDrivers.bind(authController));

export default router;