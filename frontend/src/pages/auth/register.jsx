import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import authService from "../../service/authService";
import { saveAuth } from "../../utils/authUtils";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDay: "",
        cin: "",
        phone: "",
        role: "Chauffeur"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const dataToSend = {
                ...formData,
                birthDay: formData.birthDay ? new Date(formData.birthDay).toISOString() : formData.birthDay
            };
            const response = await authService.register(dataToSend);

            if (response.success) {
                const backendData = response.data;

                if (backendData.data && backendData.data.token) {
                    saveAuth(backendData.data, backendData.data.token);

                    if (backendData.data.role === 'Admin') {
                        navigate("/admin/dashboard");
                    } else if (backendData.data.role === 'Chauffeur') {
                        navigate("/driver/dashboard");
                    } else {
                        navigate("/");
                    }
                } else {
                    setError("Erreur : format de réponse invalide");
                }
            } else {
                setError(response.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            console.error("Erreur inscription:", err);
            setError("Erreur de connexion au serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-4 md:p-8 bg-gray-900 border border-gray-800 rounded-lg">
            <div className="text-center mb-6 md:mb-8">
                <p className="text-3xl md:text-4xl font-bold tracking-wider mb-2">
                    <span className="text-blue-400">Road</span>
                    <span className="text-orange-400">Sync</span>
                </p>
                <h2 className="text-lg md:text-xl text-gray-400 font-medium">
                    Créer un nouveau compte
                </h2>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Prénom"
                        id="firstName"
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Nom"
                        id="lastName"
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="exemple@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Mot de passe"
                        type="password"
                        id="password"
                        placeholder="Min. 8 car. (Maj, min, chiffre, spécial)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Date de naissance"
                        type="date"
                        id="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="CIN"
                        id="cin"
                        placeholder="AB12345"
                        value={formData.cin}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Téléphone"
                        id="phone"
                        type="tel"
                        placeholder="06 00..."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2">Rôle</label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                    >
                        <option value="Chauffeur">Chauffeur</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className="mt-8">
                    <Button 
                        type="submit" 
                        style="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Création en cours..." : "Créer mon compte"}
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">
                        Déjà un compte ?{" "}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;