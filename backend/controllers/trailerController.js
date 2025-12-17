import trailerService from '../services/trailerService.js';
import returns from '../utils/returns.js';

class TrailerController {
    async createTrailer(req, res, next) {
        try {
            const result = await trailerService.createTrailer(req.body);
            return returns(res, 201, true, "Remorque ajoutée avec succès", result);
        } catch (e) {
            next(e);
        }
    }

    async readTrailers(req, res, next) {
        try {
            const trailers = await trailerService.readTrailers();
            return returns(res, 200, true, "Remorques trouvées", trailers);
        } catch (e) {
            next(e);
        }
    }

    async readTrailer(req, res, next) {
        try {
            const trailer = await trailerService.readTrailer(req.params.id);
            return returns(res, 200, true, "Remorque trouvée", trailer);
        } catch (e) {
            next(e);
        }
    }

    async updateTrailer(req, res, next) {
        try {
            const result = await trailerService.updateTrailer(req.params.id, req.body);
            return returns(res, 200, true, "Modification réussie", result);
        } catch (e) {
            next(e);
        }
    }

    async deleteTrailer(req, res, next) {
        try {
            await trailerService.deleteTrailer(req.params.id);
            return returns(res, 200, true, "Suppression réussie");
        } catch (e) {
            next(e);
        }
    }
}

export default new TrailerController();