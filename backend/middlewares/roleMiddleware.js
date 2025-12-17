import returns from "../utils/returns.js";

class RoleMiddleware {
    isAdmin(req, res, next) {
        if (!req.user?.role) return returns(res, 401, false, "Utilisateur non identifié.");
        if (req.user.role === 'Admin') return next();
        return returns(res, 403, false, "Accès refusé. Droits administrateur requis.");
    }

    isDriver(req, res, next) {
        if (!req.user?.role) return returns(res, 401, false, "Utilisateur non identifié.");
        if (req.user.role === 'Chauffeur') return next();
        return returns(res, 403, false, "Accès refusé. Espace réservé aux chauffeurs.");
    }

    checkRoles(requiredRole) {
        return (req, res, next) => {
            if (!req.user?.role) {
                return returns(res, 401, false, "Utilisateur non identifié.");
            }

            if (!requiredRole.includes(req.user.role)) {
                return returns(res, 403, false, `Accès refusé. Rôle ${requiredRole.join(' ou ')} requis.`);
            }
            
            next();
        };
    }
}

export default new RoleMiddleware();