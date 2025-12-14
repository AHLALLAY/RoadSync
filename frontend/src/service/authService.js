import apiHandler from "./apiHandler";

class AuthService{

    async login(identifiants){
        const response = await apiHandler("/auth/login", "POST", identifiants);
        return response;
    }

}

export default new AuthService();