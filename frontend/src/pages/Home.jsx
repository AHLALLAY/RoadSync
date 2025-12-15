import { Link } from 'react-router-dom';
import logo from '../assets/RoadSync.png';
import { Button } from '../components';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 flex flex-col items-center space-y-12">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <img
                        src={logo}
                        alt="RoadSync Logo"
                        className="relative w-64 h-64 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-sm">
                        Road<span className="text-orange-500">Sync</span>
                    </h1>
                    <p className="text-blue-200/60 text-lg max-w-md mx-auto">
                        La solution ultime pour la gestion de flotte moderne.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                    <Link to="/login" className="flex-1">
                        <Button className="w-full bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
                            Connexion
                        </Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 text-lg border-2 border-transparent shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all duration-300">
                            Inscription
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
