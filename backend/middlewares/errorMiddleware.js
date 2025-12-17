import returns from '../utils/returns.js';

class ErrorMiddleware {
    errorHandler(err, req, res, next) {
        if (err.isOperational && err.statusCode) {
            return returns(res, err.statusCode, false, err.message);
        }

        if (err.name === 'ValidationError') {
            const firstErrorMessage = Object.values(err.errors).map(val => val.message)[0];
            return returns(res, 400, false, firstErrorMessage);
        }

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return returns(res, 400, false, `Cette valeur pour ${field} existe déjà.`);
        }

        if (err.name === 'CastError') {
            return returns(res, 400, false, `ID invalide: ${err.value}`);
        }

        if (err.name === 'JsonWebTokenError') {
            return returns(res, 401, false, "Token invalide.");
        }

        if (err.name === 'TokenExpiredError') {
            return returns(res, 401, false, "Token expiré.");
        }

        if (err.message) {
            const statusCode = err.statusCode || 500;
            return returns(res, statusCode, false, err.message);
        }

        console.error('Erreur non gérée:', err);
        return returns(res, 500, false, "Erreur serveur inattendue", null, process.env.NODE_ENV === 'development' ? err.message : undefined);
    }

    notFoundHandler(req, res, next) {
        return returns(res, 404, false, `Route ${req.method} ${req.originalUrl} non trouvée.`);
    }
}

export default new ErrorMiddleware();

