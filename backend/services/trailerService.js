import Trailer from "../models/TrailerModel.js";
import Trip from "../models/TripModel.js";
import AppError from '../utils/AppError.js';

class TrailerService {
    async createTrailer(trailerData) {
        const isExist = await Trailer.findOne({ registrationNumber: trailerData.registrationNumber });
        if (isExist) throw AppError.duplicate("matricule", trailerData.registrationNumber);

        return await Trailer.create(trailerData);
    }

    async readTrailers() {
        return await Trailer.find({});
    }

    async readTrailer(id) {
        const trailer = await Trailer.findById(id);
        if (!trailer) throw AppError.notFound("remorque");
        return trailer;
    }

    async updateTrailer(id, data) {
        const trailer = await Trailer.findById(id);
        if (!trailer) throw AppError.notFound("remorque");
        if (data.registrationNumber && data.registrationNumber !== trailer.registrationNumber) {
            const isExist = await Trailer.findOne({ registrationNumber: data.registrationNumber });
            if (isExist) throw AppError.duplicate("matricule", data.registrationNumber);
        }
        return await Trailer.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    async deleteTrailer(id) {
        const trailer = await Trailer.findById(id);
        if (!trailer) throw AppError.notFound("remorque");
        const tripsWithTrailer = await Trip.findOne({ trailer: id });
        if (tripsWithTrailer) {
            throw AppError.conflict("Impossible de supprimer cette remorque car elle est associée à un ou plusieurs trajets.");
        }
        return await Trailer.findByIdAndDelete(id);
    }
}

export default new TrailerService();