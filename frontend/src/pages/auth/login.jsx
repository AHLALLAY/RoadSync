import { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email, password);

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-slate-900 border border-slate-800 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            
            <h1 className="text-2xl font-bold mb-6 text-center text-white tracking-wider">
                Connexion
            </h1>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    style="w-full p-3 rounded bg-slate-800 text-gray-100 border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all mb-4" 
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <Input
                    label="Mot de passe"
                    type="password"
                    id="password"
                    style="w-full p-3 rounded bg-slate-800 text-gray-100 border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all mb-6" 
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <div className="mt-4">
                    <Button type="submit" style="w-full py-3 rounded font-bold transition-all duration-300 border border-cyan-500 text-cyan-400 bg-transparent hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                        Se connecter
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;