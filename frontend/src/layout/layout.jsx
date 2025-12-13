import { Outlet } from 'react-router-dom';
import Header from '../components/ui/header';

function Layout() {
    return (
        <div className="min-h-screen bg-slate-950 text-gray-200 font-sans selection:bg-cyan-500 selection:text-black">

            <Header/>

            <main className="container mx-auto p-4">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;