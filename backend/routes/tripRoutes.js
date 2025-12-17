import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import tripController from '../controllers/tripController.js';

const router = express.Router();

router.post(
    '/trip',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    tripController.createTrip
);

router.get(
    '/trips',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    tripController.readTrips
);

router.get(
    '/trip/:id',
    authMiddleware.verifyToken,
    roleMiddleware.checkRoles(['Admin', 'Chauffeur']),
    tripController.readTrip
);

router.put(
    '/trip/:id/status',
    authMiddleware.verifyToken,
    roleMiddleware.checkRoles(['Admin', 'Chauffeur']),
    tripController.updateTripStatus
);

router.get(
    '/my-trips',
    authMiddleware.verifyToken,
    roleMiddleware.checkRoles(['Chauffeur']),
    tripController.getMyTrips
);

export default router;