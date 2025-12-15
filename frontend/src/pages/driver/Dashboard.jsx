import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import driverService from '../../service/driverService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalTrips: 0,
        completedTrips: 0,
        inProgressTrips: 0,
        plannedTrips: 0
    });
    const [recentTrips, setRecentTrips] = useState([]);
    const [upcomingTrip, setUpcomingTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await driverService.getMyTrips();
            if (res.success) {
                const tripsData = res.data.data || res.data;
                const trips = Array.isArray(tripsData) ? tripsData : [];

                const completed = trips.filter(t => t.status === 'Completed');
                const inProgress = trips.filter(t => t.status === 'InProgress');
                const planned = trips.filter(t => t.status === 'Planned');

                setStats({
                    totalTrips: trips.length,
                    completedTrips: completed.length,
                    inProgressTrips: inProgress.length,
                    plannedTrips: planned.length
                });

                const upcoming = planned
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0] || null;
                setUpcomingTrip(upcoming);

                const recent = trips
                    .sort((a, b) => new Date(b.startDate || b.createdAt) - new Date(a.startDate || a.createdAt))
                    .slice(0, 5);
                setRecentTrips(recent);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-white">Chargement du tableau de bord...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Tableau de Bord</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Total Missions</h3>
                    <p className="text-3xl font-bold text-white mt-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{stats.totalTrips}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Missions Terminées</h3>
                    <p className="text-3xl font-bold text-blue-400 mt-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">{stats.completedTrips}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Missions en Cours</h3>
                    <p className="text-3xl font-bold text-orange-500 mt-2 drop-shadow-[0_0_5px_rgba(234,88,12,0.5)]">{stats.inProgressTrips}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Missions Planifiées</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{stats.plannedTrips}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 mb-4">Derniers Trajets</h3>
                    {recentTrips.length > 0 ? (
                        <div className="space-y-3">
                            {recentTrips.map(t => (
                                <Link
                                    key={t._id}
                                    to={`/driver/trip/${t._id}`}
                                    className="flex justify-between items-center p-3 bg-slate-800/50 rounded border border-blue-500/10 hover:border-blue-500/30 transition-colors"
                                >
                                    <div>
                                        <div className="font-semibold text-white">{t.departureCity} ➝ {t.arrivalCity}</div>
                                        <div className="text-xs text-blue-300">{new Date(t.startDate).toLocaleDateString()}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-200`}>{t.status}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Aucun trajet récent.</p>
                    )}
                </div>

                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 mb-4">Prochaine Mission</h3>
                    {upcomingTrip ? (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                                <div>
                                    <div className="font-semibold text-white">{upcomingTrip.departureCity} ➝ {upcomingTrip.arrivalCity}</div>
                                    <div className="text-xs text-orange-300">{new Date(upcomingTrip.startDate).toLocaleDateString()}</div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-orange-900/50 text-orange-200">{upcomingTrip.status}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Aucune mission planifiée.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
