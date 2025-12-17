import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import trailerController from '../controllers/trailerController.js';

const router = express.Router();

router.post(
    '/trailer',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    trailerController.createTrailer
);

router.get(
    '/trailers',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    trailerController.readTrailers
);

router.get(
    '/trailer/:id',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    trailerController.readTrailer
);

router.put(
    '/trailer/:id',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    trailerController.updateTrailer
);

router.delete(
    '/trailer/:id',
    authMiddleware.verifyToken,
    roleMiddleware.isAdmin,
    trailerController.deleteTrailer
);

export default router;
