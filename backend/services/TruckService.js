import Truck from "../models/TruckModel.js";

class TruckService {
    async createTruck(truckData) {
        const isExiste = await Truck.findOne({registrationNumber: truckData.registrationNumber});

        if(isExiste) throw new Error(`Le camion avec le matricule ${truckData.registrationNumber} existe déjà.`);
        
        const newTruck = await Truck.create(truckData);
        
        return newTruck;
    }

    async readeTrucks(){
        const trucks = await Truck.find({});
        
        if(trucks.length == 0) throw new Error("Pas de camions");
        return trucks;
    }

    async readeTruck(truckId){
        const truck = await Truck.findById(truckId);
        
        if(!truck) throw new Error("Ce camion n'existe pas");
        return truck;
    }

    async updateTruck(truckId, truckData){
        const truck = await Truck.findByIdAndUpdate(truckId, truckData);
        
        if(!truck) throw new Error("Ce camion n'existe pas");
        return truck;
    }

    async deleteTruck(truckId){
        const truck = await Truck.findByIdAndDelete(truckId);
            
        if(!truck) throw new Error("Ce camion n'existe pas");
        return truck;
    }
}

export default new TruckService();