import Trip from "../models/TripModel.js";
import Truck from "../models/TruckModel.js";
import Trailer from "../models/TrailerModel.js";
import User from "../models/UserModel.js";
import AppError from '../utils/AppError.js';

class TripService {
    async createTrip(tripData) {
        const truck = await Truck.findById(tripData.truck);
        if (!truck) throw AppError.notFound("camion");

        const trailer = await Trailer.findById(tripData.trailer);
        if (!trailer) throw AppError.notFound("remorque");

        const driver = await User.findById(tripData.driver);
        if (!driver || driver.role !== 'Chauffeur') throw AppError.validation("Chauffeur invalide");

        const newTrip = await Trip.create(tripData);

        await Truck.findByIdAndUpdate(tripData.truck, { status: 'En voyage' });
        await Trailer.findByIdAndUpdate(tripData.trailer, { status: 'En voyage' });

        return newTrip;
    }

    async readTrips() {
        return await Trip.find({})
            .populate('driver', 'firstName lastName email')
            .populate('truck', 'registrationNumber make model')
            .populate('trailer', 'registrationNumber type');
    }

    async readTrip(id) {
        const trip = await Trip.findById(id)
            .populate('driver', 'firstName lastName email')
            .populate('truck', 'registrationNumber make model')
            .populate('trailer', 'registrationNumber type');
        if (!trip) throw AppError.notFound("trajet");
        return trip;
    }

    async updateTripStatus(id, status, km, fuelRefillLitres = null, remarks = null) {
        const trip = await Trip.findById(id);
        if (!trip) throw AppError.notFound("trajet");

        trip.status = status;
        if (status === 'Completed') {
            trip.endKm = km;
            trip.distanceKm = km - trip.startKm;
            trip.endDate = new Date();

            if (fuelRefillLitres != null) {
                trip.fuelRefillLitres = fuelRefillLitres;
            }
            if (fuelRefillLitres > 0 && trip.distanceKm > 0) {
                trip.theoreticalConsumption = (fuelRefillLitres / trip.distanceKm) * 100;
            }

            const truck = await Truck.findById(trip.truck);
            if (truck) {
                await Truck.findByIdAndUpdate(trip.truck, { 
                    status: 'Disponible',
                    mileage: km
                });
            }

            const trailer = await Trailer.findById(trip.trailer);
            if (trailer) {
                const trailerNewMileage = (trailer.mileage || 0) + trip.distanceKm;
                await Trailer.findByIdAndUpdate(trip.trailer, { 
                    status: 'Disponible',
                    mileage: trailerNewMileage
                });
            }
        } else if (status === 'InProgress') {
            await Truck.findByIdAndUpdate(trip.truck, { mileage: trip.startKm });
        }

        if (remarks) {
            trip.remarks = remarks;
        }

        return await trip.save();
    }

    async getTripsByDriver(driverId) {
        return await Trip.find({ driver: driverId })
            .populate('truck', 'registrationNumber')
            .populate('trailer', 'registrationNumber')
            .sort({ startDate: -1 });
    }
}

export default new TripService();
