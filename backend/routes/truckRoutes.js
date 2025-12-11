import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import TruckController from '../controllers/TruckController.js'; 

const router = express.Router();

router.post('/truck', authMiddleware.verifyToken, roleMiddleware.isAdmin, TruckController.createTruck);
router.get('/trucks', authMiddleware.verifyToken, roleMiddleware.isAdmin, TruckController.readeTrucks);

export default router;