import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components';
import { getUser } from '../utils/authUtils';
import { useState, useEffect } from 'react';

const DriverLayout = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getUser();
        setUser(currentUser);
    }, []);
    const navItems = [
        { to: '/driver/dashboard', label: 'Tableau de bord' },
        { to: '/driver/trips', label: 'Mes Missions' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="text-center">
                            <h1 className="text-xl font-bold tracking-wider">
                                <span className="text-blue-400">Road</span>
                                <span className="text-orange-400">Sync</span>
                            </h1>
                        </div>
                        <span className="text-xs font-normal text-gray-400">Chauffeur</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm hidden md:inline-block">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <Button variant="logout" />
                    </div>
                </div>
            </header>
            <nav className="hidden md:flex bg-gray-800 border-b border-gray-700 px-4">
                <div className="container mx-auto flex space-x-6">
                    {navItems.map((item) => (
                        <Link 
                            key={item.to} 
                            to={item.to} 
                            className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-blue-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
            <main className="flex-1 container mx-auto p-4 md:p-6">
                <Outlet />
            </main>
            <nav className="bg-gray-800 border-t border-gray-700 p-3 md:hidden fixed bottom-0 w-full flex justify-around">
                {navItems.map((item) => (
                    <Link 
                        key={item.to} 
                        to={item.to} 
                        className={`flex-1 text-center py-2 px-2 text-sm text-gray-400 hover:text-white active:text-blue-400 transition-colors ${item.to === '/driver/dashboard' ? 'text-blue-400 font-medium' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default DriverLayout;
