import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='min-h-screen bg-black text-gray-100'>
            <header className='p-4'>
                <p><a href="/" className='text-white text-sm font-bold border-b-2 rounded-lg px-2 '>Home</a></p>
            </header>
            <main className="container mx-auto px-4">
                <div className="flex items-center justify-center min-h-screen py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;