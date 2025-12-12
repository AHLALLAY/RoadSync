import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import truckController from '../controllers/TruckController.js';

const router = express.Router();

router.post(
    '/truck',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    truckController.createTruck
);

router.get(
    '/trucks',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    truckController.readeTrucks
);

router.get(
    '/truck/:id',
    authMiddleware.verifyToken,
    roleMiddleware.checkRoles(['Admin', 'Chauffeur']),
    truckController.readeTruck
);

export default router;