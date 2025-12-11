import returns from "../utils/returns.js";

class RoleMiddleware {

    isAdmin(req, res, next) {
        if (!req.user || !req.user.role) return returns(res, 401, false, "Utilisateur non identifié.");
        if (req.user.role === 'admin') return next();

        return returns(res, 403, false, "Accès refusé. Droits administrateur requis.");
    }

    isDriver(req, res, next) {
        if (!req.user || !req.user.role) return returns(res, 401, false, "Utilisateur non identifié.");
        if (req.user.role === 'driver') return next();

        return returns(res, 403, false, "Accès refusé. Espace réservé aux chauffeurs.");
    }

    check(requiredRole) {
        return (req, res, next) => {
            if (!req.user || !req.user.role) {
                 return returns(res, 401, false, "Utilisateur non identifié.");
            }

            if (req.user.role !== requiredRole) {
                return returns(res, 403, false, `Accès refusé. Rôle ${requiredRole} requis.`);
            }
            
            next();
        };
    }
}

export default new RoleMiddleware();