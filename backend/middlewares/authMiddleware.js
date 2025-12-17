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
        } catch (error) {
            let message = "Token invalide.";

            if (error.name === 'TokenExpiredError') {
                message = "Token expiré.";
            } else if (error.name === 'JsonWebTokenError') {
                message = "Token mal formé.";
            } else if (error.name === 'NotBeforeError') {
                message = "Token pas encore valide.";
            }

            return returns(res, 401, false, message);
        }
    }
}

export default new AuthMiddleware();