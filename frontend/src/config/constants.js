export const TRIP_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'InProgress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
};

export const TRUCK_STATUS = {
    AVAILABLE: 'Disponible',
    IN_USE: 'En cours d\'utilisation',
    MAINTENANCE: 'En maintenance',
    OUT_OF_SERVICE: 'Hors service'
};

export const USER_ROLES = {
    ADMIN: 'Admin',
    DRIVER: 'Chauffeur'
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Erreur de connexion au serveur',
    UNAUTHORIZED: 'Vous n\'êtes pas autorisé à effectuer cette action',
    NOT_FOUND: 'Ressource non trouvée',
    SERVER_ERROR: 'Une erreur est survenue sur le serveur',
    UNKNOWN_ERROR: 'Une erreur inattendue est survenue'
};

export const SUCCESS_MESSAGES = {
    CREATED: 'Créé avec succès',
    UPDATED: 'Modifié avec succès',
    DELETED: 'Supprimé avec succès',
    LOGGED_IN: 'Connexion réussie',
    LOGGED_OUT: 'Déconnexion réussie'
};