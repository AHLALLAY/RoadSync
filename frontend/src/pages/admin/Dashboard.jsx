import { useState, useEffect } from 'react';
import truckService from '../../service/truckService';
import tripService from '../../service/tripService';
import driverService from '../../service/driverService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        trucksAvailable: 0,
        activeTrips: 0,
        maintenanceAlerts: 0,
        driversFree: 0
    });
    const [recentTrips, setRecentTrips] = useState([]);
    const [upcomingMaintenance, setUpcomingMaintenance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [trucksRes, tripsRes, driversRes] = await Promise.all([
                truckService.getTrucks(),
                tripService.getTrips(),
                driverService.getDrivers()
            ]);

            const trucks = (trucksRes.success && trucksRes.data.data) ? trucksRes.data.data : [];
            const availableTrucks = Array.isArray(trucks) ? trucks.filter(t => t.status === 'Disponible').length : 0;

            const trips = (tripsRes.success && tripsRes.data.data) ? tripsRes.data.data : [];
            const activeTrips = Array.isArray(trips) ? trips.filter(t => t.status === 'InProgress').length : 0;
            const recent = Array.isArray(trips) ? trips.slice(0, 5) : [];

            const activeMaintenances = 0;
            const recentMaint = [];

            const drivers = (driversRes.success && driversRes.data.data) ? driversRes.data.data : [];
            const busyDriverIds = trips.filter(t => t.status === 'InProgress').map(t => t.driver?._id || t.driver);
            const freeDrivers = Array.isArray(drivers) ? drivers.filter(d => !busyDriverIds.includes(d._id)).length : 0;

            setStats({
                trucksAvailable: availableTrucks,
                activeTrips: activeTrips,
                maintenanceAlerts: activeMaintenances,
                driversFree: freeDrivers
            });
            setRecentTrips(recent);
            setUpcomingMaintenance(recentMaint);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
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
                    <h3 className="text-blue-200 text-sm font-medium">Camions Disponibles</h3>
                    <p className="text-3xl font-bold text-white mt-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{stats.trucksAvailable}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Voyages en Cours</h3>
                    <p className="text-3xl font-bold text-blue-400 mt-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">{stats.activeTrips}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Alertes Maintenance</h3>
                    <p className="text-3xl font-bold text-orange-500 mt-2 drop-shadow-[0_0_5px_rgba(234,88,12,0.5)]">{stats.maintenanceAlerts}</p>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <h3 className="text-blue-200 text-sm font-medium">Chauffeurs Libres</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{stats.driversFree}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 mb-4">Derniers Trajets</h3>
                    {recentTrips.length > 0 ? (
                        <div className="space-y-3">
                            {recentTrips.map(t => (
                                <div key={t._id} className="flex justify-between items-center p-3 bg-slate-800/50 rounded border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                                    <div>
                                        <div className="font-semibold text-white">{t.departureCity} ➝ {t.arrivalCity}</div>
                                        <div className="text-xs text-blue-300">{new Date(t.startDate).toLocaleDateString()}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-200`}>{t.status}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Aucun trajet récent.</p>
                    )}
                </div>

                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 mb-4">Maintenance à venir</h3>
                    {upcomingMaintenance.length > 0 ? (
                        <div className="space-y-3">
                            {upcomingMaintenance.map(m => (
                                <div key={m._id} className="flex justify-between items-center p-3 bg-slate-800/50 rounded border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                                    <div>
                                        <div className="font-semibold text-white">{m.type}</div>
                                        <div className="text-xs text-orange-300">{new Date(m.date).toLocaleDateString()}</div>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded bg-orange-900/50 text-orange-200">{m.status}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Aucune maintenance prévue.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
