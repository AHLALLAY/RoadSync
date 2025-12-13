import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [role, setRole] = useState("");

    const checkRole = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const userRole = JSON.parse(user);
            setRole(userRole.role);
        }

    }


    useEffect(() => {
        checkRole();
    }, []);

    const MENUS = {
        Admin: [
            { label: "Chauffeurs", path: "/chauffeurs" },
            { label: "Camions", path: "/camions" },
            { label: "Bennes", path: "/bennes" },
            { label: "Charges", path: "/charges" }
        ],
        Chauffeur: [
            { label: "Mon Trajet", path: "/trajet" },
            { label: "Historique", path: "/historique" }
        ],
        Guest: [
            { label: "Inscription", path: "/register" },
            { label: "Connexion", path: "/login" }
        ]
    };

    const currentMenu = MENUS[role] || MENUS.Guest;

    return (
        <header className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800 shadow-lg shadow-blue-900/20">
            <div>
                <p className="text-2xl font-bold tracking-wider">
                    {/* Le Bleu Néon avec une lueur */}
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
                        Road
                    </span>
                    {/* L'Orange Néon avec une lueur */}
                    <span className="text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)] ml-1">
                        Sync
                    </span>
                </p>
            </div>

            <nav className="flex gap-6">
                {currentMenu.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="text-gray-400 font-medium transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

export default Header;