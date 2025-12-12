import truckService from '../services/truckService.js';
import returns from '../utils/returns.js';

class TruckController {
    async createTruck(req, res) {
        try {
            const result = await truckService.createTruck(req.body);
            return returns(res, 201, true, "L'ajout du camion a réussi", result);
        } catch (e) {
            if (e.name === 'ValidationError') {
                const firstErrorMessage = Object.values(e.errors).map(val => val.message)[0];
                return returns(res, 400, false, firstErrorMessage);
            }
            if (e.code === 11000) {
                return returns(res, 400, false, "Ce véhicule (matricule) existe déjà.");
            }

            if (e.message.includes("existe déjà") || e.message.includes("Veuillez remplir")) {
                return returns(res, 400, false, e.message);
            }

            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }
    }

    async readeTrucks(req, res) {
        try {
            const trucks = await truckService.readeTrucks();
            return returns(res, 200, true, "Les camions trouvé", trucks);
        } catch (e) {
            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }
    }

    async readeTruck(req, res) {
        try {
            const trucks = await truckService.readeTruck(req.params.id);
            return returns(res, 200, true, "Les camions trouvé", trucks);
        } catch (e) {
            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }
    }
}

export default new TruckController();