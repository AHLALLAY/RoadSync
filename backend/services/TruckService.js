import Truck from "../models/TruckModel.js";
import AppError from '../utils/AppError.js';

class TruckService {
    async createTruck(truckData) {
        const isExiste = await Truck.findOne({ registrationNumber: truckData.registrationNumber });
        if (isExiste) throw AppError.duplicate("matricule", truckData.registrationNumber);
        return await Truck.create(truckData);
    }

    async readTrucks() {
        const trucks = await Truck.find({});
        if (trucks.length === 0) throw AppError.notFound("camions");
        return trucks;
    }

    async readTruck(truckId) {
        const truck = await Truck.findById(truckId);
        if (!truck) throw AppError.notFound("camion");
        return truck;
    }

    async updateTruck(truckId, truckData) {
        const truck = await Truck.findById(truckId);
        if (!truck) throw AppError.notFound("camion");
        if (truckData.registrationNumber && truckData.registrationNumber !== truck.registrationNumber) {
            const isExiste = await Truck.findOne({ registrationNumber: truckData.registrationNumber });
            if (isExiste) throw AppError.duplicate("matricule", truckData.registrationNumber);
        }
        return await Truck.findByIdAndUpdate(truckId, truckData, {
            new: true,
            runValidators: true
        });
    }

    async deleteTruck(truckId) {
        const truck = await Truck.findById(truckId);
        if (!truck) throw AppError.notFound("camion");
        const Trip = (await import("../models/TripModel.js")).default;
        const tripsWithTruck = await Trip.findOne({ truck: truckId });
        if (tripsWithTruck) {
            throw AppError.conflict("Impossible de supprimer ce camion car il est associé à un ou plusieurs trajets.");
        }
        return await Truck.findByIdAndDelete(truckId);
    }
}

export default new TruckService();