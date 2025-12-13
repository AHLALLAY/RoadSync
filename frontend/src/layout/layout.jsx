import { Outlet } from 'react-router-dom';
import Header from '../components/ui/header';

function Layout() {
    return (
        <div className="min-h-screen bg-black text-gray-100">
            <Header />
            <main className="container mx-auto px-4">
                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;