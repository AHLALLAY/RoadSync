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
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
            <div className="mb-4 md:mb-0">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-wider">
                        <span className="text-blue-400">Road</span>
                        <span className="text-orange-400">Sync</span>
                    </h1>
                </div>
            </div>
            <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
                {currentMenu.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="text-gray-400 font-medium hover:text-blue-300"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

export default Header;

