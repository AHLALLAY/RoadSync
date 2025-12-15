import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import driverService from '../../service/driverService';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await driverService.getMyTrips();
                if (res.success) {
                    const tripsData = res.data.data || res.data;
                    setTrips(Array.isArray(tripsData) ? tripsData : []);
                }
            } catch (e) {
                console.error("Error fetching trips:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Mes Missions</h2>
            <div className="space-y-4">
                {trips.length === 0 ? (
                    <p className="text-gray-400">Aucune mission assignée.</p>
                ) : (
                    trips.map(trip => (
                        <div key={trip._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${trip.status === 'Completed' ? 'bg-green-900 text-green-300' :
                                        trip.status === 'InProgress' ? 'bg-blue-900 text-blue-300' : 'bg-yellow-900 text-yellow-300'
                                    }`}>
                                    {trip.status === 'Planned' ? 'À faire' : trip.status}
                                </span>
                                <span className="text-gray-400 text-sm">{new Date(trip.startDate).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {trip.departureCity} <span className="text-gray-500">➜</span> {trip.arrivalCity}
                            </h3>
                            <div className="text-sm text-gray-400 mb-4">
                                <p>Camion: {trip.truck?.registrationNumber}</p>
                                <p>Remorque: {trip.trailer?.registrationNumber}</p>
                            </div>
                            <Link to={`/driver/trip/${trip._id}`} className="block text-center w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                                Voir Détails
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyTrips;
