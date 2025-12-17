import authService from "../services/authService.js";
import returns from '../utils/returns.js';

class AuthController {
    async register(req, res, next) {
        try {
            const result = await authService.register(req.body);
            return returns(res, 201, true, "L'inscription a réussi", result);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            return returns(res, 200, true, "La connexion a réussi", result);
        } catch (e) {
            next(e);
        }
    }

    async getDrivers(req, res, next) {
        try {
            const result = await authService.getDrivers();
            return returns(res, 200, true, "Les chauffeurs trouvés", result);
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();