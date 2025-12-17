import returns from '../utils/returns.js';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
    verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return returns(res, 403, false, "Accès refusé. Aucun token fourni.");
        }

        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = userData;
            next();
        } catch (e) {
            return returns(res, 401, false, "Token invalide ou expiré.");
        }
    }
}

export default new AuthMiddleware();