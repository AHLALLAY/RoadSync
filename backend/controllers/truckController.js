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
            const truck = await truckService.readeTruck(req.params.id);
            if (req.user.role === 'Chauffeur') {
                if (truck.driver.toString() !== req.user._id.toString()) {
                    return returns(res, 403, false, "Vous ne pouvez consulter que votre propre camion.");
                }
            }
            return returns(res, 200, true, "Les camions trouvé", truck);
        } catch (e) {
            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }

    }

    async updateTruck(req, res) {
        try {
            const truck = await truckService.updateTruck(req.params.id, req.body);
            return returns(res, 200, true, "Le camion a été mis à jour", truck);
        } catch (e) {
            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }
    }

    async deleteTruck(req, res) {
        try {
            const truck = await truckService.deleteTruck(req.params.id);
            return returns(res, 200, true, "Le camion a été supprimé", truck);
        } catch (e) {
            return returns(res, 500, false, "Erreur serveur inattendue", null, e.message);
        }
    }
}

export default new TruckController();