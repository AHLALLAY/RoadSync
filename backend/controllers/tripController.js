import tripService from '../services/tripService.js';
import returns from '../utils/returns.js';

class TripController {
    async createTrip(req, res, next) {
        try {
            const result = await tripService.createTrip(req.body);
            return returns(res, 201, true, "Trajet créé avec succès", result);
        } catch (e) {
            next(e);
        }
    }

    async readTrips(req, res, next) {
        try {
            const result = await tripService.readTrips();
            return returns(res, 200, true, "Trajets trouvés", result);
        } catch (e) {
            next(e);
        }
    }

    async readTrip(req, res, next) {
        try {
            const result = await tripService.readTrip(req.params.id);
            if (req.user.role === 'Chauffeur' && result.driver._id.toString() !== req.user.id.toString()) {
                return returns(res, 403, false, "Accès interdit à ce trajet");
            }
            return returns(res, 200, true, "Trajet trouvé", result);
        } catch (e) {
            next(e);
        }
    }

    async updateTripStatus(req, res, next) {
        try {
            const { status, km, fuelRefillLitres, remarks } = req.body;
            const result = await tripService.updateTripStatus(req.params.id, status, km, fuelRefillLitres, remarks);
            return returns(res, 200, true, "Statut mis à jour", result);
        } catch (e) {
            next(e);
        }
    }

    async getMyTrips(req, res, next) {
        try {
            const result = await tripService.getTripsByDriver(req.user.id);
            return returns(res, 200, true, "Mes trajets", result);
        } catch (e) {
            next(e);
        }
    }
}

export default new TripController();