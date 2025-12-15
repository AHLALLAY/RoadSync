import apiHandler from "./apiHandler";

class AuthService{
    async login(identifiants){
        return await apiHandler("/auth/login", "POST", identifiants);
    }

    async register(userData){
        return await apiHandler("/auth/register", "POST", userData);
    }
}

export default new AuthService();