import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import truckController from '../controllers/truckController.js'; 

const router = express.Router();

router.post('/truck', authMiddleware.verifyToken, roleMiddleware.isAdmin, truckController.createTruck.bind(truckController));

export default router;