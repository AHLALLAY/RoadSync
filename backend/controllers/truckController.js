import truckService from '../services/truckService.js';
import returns from '../utils/returns.js';

class TruckController {
    async createTruck(req, res, next) {
        try {
            const result = await truckService.createTruck(req.body);
            return returns(res, 201, true, "L'ajout du camion a réussi", result);
        } catch (e) {
            next(e);
        }
    }

    async readTrucks(req, res, next) {
        try {
            const trucks = await truckService.readTrucks();
            return returns(res, 200, true, "Les camions trouvés", trucks);
        } catch (e) {
            next(e);
        }
    }

    async readTruck(req, res, next) {
        try {
            const truck = await truckService.readTruck(req.params.id);
            return returns(res, 200, true, "Camion trouvé", truck);
        } catch (e) {
            next(e);
        }
    }

    async updateTruck(req, res, next) {
        try {
            const result = await truckService.updateTruck(req.params.id, req.body);
            return returns(res, 200, true, "Modification réussie", result);
        } catch (e) {
            next(e);
        }
    }

    async deleteTruck(req, res, next) {
        try {
            await truckService.deleteTruck(req.params.id);
            return returns(res, 200, true, "Suppression réussie");
        } catch (e) {
            next(e);
        }
    }
}

export default new TruckController();