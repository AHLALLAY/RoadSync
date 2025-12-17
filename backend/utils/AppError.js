class AppError extends Error {
    constructor(message = "", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }

    validation(message = "Données invalides") {
        const error = new AppError(message, 400);
        error.name = 'ValidationError';
        return error;
    }

    notFound(resource = "Ressource") {
        const error = new AppError(`${resource} n'existe pas`, 404);
        error.name = 'NotFoundError';
        error.resource = resource;
        return error;
    }

    duplicate(field, value) {
        const error = new AppError(`Le ${field} "${value}" existe déjà`, 400);
        error.name = 'DuplicateError';
        error.field = field;
        error.value = value;
        return error;
    }

    unauthorized(message = "Accès non autorisé") {
        const error = new AppError(message, 401);
        error.name = 'UnauthorizedError';
        return error;
    }

    forbidden(message = "Accès interdit") {
        const error = new AppError(message, 403);
        error.name = 'ForbiddenError';
        return error;
    }

    conflict(message = "Conflit avec l'état actuel") {
        const error = new AppError(message, 409);
        error.name = 'ConflictError';
        return error;
    }
}

export default new AppError();
