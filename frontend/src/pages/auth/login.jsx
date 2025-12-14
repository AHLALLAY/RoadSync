import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import authService from "../../service/authService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const identifiants = {
            email: email,
            password: password
        }

        const response = await authService.login(identifiants);

        if (response.success) {
            const backendData = response.data;

            if (backendData.data && backendData.data.token) {
                localStorage.setItem("token", backendData.data.token);
                localStorage.setItem("user", JSON.stringify(backendData.data));
                navigate("/");
            } else {
                setError("Erreur format de réponse invalide");
            }
        }
        else {
            setError(response.message || "Erreur lors de la connexion");
        }
    }

    return (
        <div className="w-full max-w-md p-6 md:p-8 bg-gray-900 border border-gray-800 rounded-lg">

            <div className="text-center mb-6">
                <p className="text-3xl font-bold tracking-wider mb-2">
                    <span className="text-blue-400">Road</span>
                    <span className="text-orange-400">Sync</span>
                </p>
                <h2 className="text-xl text-gray-400 font-medium">
                    Connexion
                </h2>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={loginHandler}>
                <div className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Mot de passe"
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mt-8">
                    <Button type="submit" style="w-full py-3 bg-blue-500 text-white hover:bg-blue-600">
                        Se connecter
                    </Button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">
                        Nouveau membre ?{" "}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;