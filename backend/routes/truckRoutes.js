import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import truckController from '../controllers/truckController.js';

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
    truckController.readTrucks
);

router.get(
    '/truck/:id',
    authMiddleware.verifyToken,
    roleMiddleware.checkRoles(['Admin', 'Chauffeur']),
    truckController.readTruck
);

router.put(
    '/truck/:id',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    truckController.updateTruck
);

router.delete(
    '/truck/:id',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    truckController.deleteTruck
);

export default router;