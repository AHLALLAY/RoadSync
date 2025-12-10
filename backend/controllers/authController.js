import authService from "../services/authService.js";

class AuthController {
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            return returns(res, 201, true, "L'inscription a réussi", result);
        } catch (e) {
            if (e.message === "Veuillez remplir tous les champs" || e.message === "L'email existe déjà" || e.message === "L'émail invalide" || e.message === "Le mot de passe invalide") {
                return returns(res, 400, false, e.message);
            }
            return returns(res, 500, false, "erreur inattendue", null, e.message);
        }
    }

    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            return returns(res, 200, true, "La connexion a réussi", result);
        } catch (e) {
            if (e.message === "Veuillez remplir tous les champs" || e.message === "L'email ou le mot de passe n'est pas correct" || e.message === "L'utilisateur introuvable" || e.message === "L'émail invalide" || e.message === "Le mot de passe invalide") {
                return returns(res, 400, false, e.message);
            }
            return returns(res, 500, false, "erreur inattendue", null, e.message);
        }
    }
}


export default new AuthController();