import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components';

const AdminLayout = () => {
    const navItems = [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/fleet', label: 'Gestion Flotte' },
        { to: '/admin/trips', label: 'Gestion Trajets' }
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-wider">
                            <span className="text-blue-400">Road</span>
                            <span className="text-orange-400">Sync</span>
                        </h1>
                        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.to} 
                            to={item.to} 
                            className="block px-4 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <Button variant="logout" className="w-full px-4 py-2" />
                </div>
            </aside>
            <main className="flex-1 overflow-auto bg-black">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
