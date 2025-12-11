import Truck from "../models/TruckModel.js";

class TruckService {
    async createTruck(truckData) {
        const isExiste = await Truck.findOne({registrationNumber: truckData.registrationNumber});

        if(isExiste) throw new Error(`Le camion avec le matricule ${truckData.registrationNumber} existe déjà.`);
        
        const newTruck = await Truck.create(truckData);
        
        return newTruck;
    }
}

export default new TruckService();