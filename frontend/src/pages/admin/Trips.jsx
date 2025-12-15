import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tripService from '../../service/tripService';
import truckService from '../../service/truckService';
import trailerService from '../../service/trailerService';
import driverService from '../../service/driverService';
import { Button, Input, Modal } from '../../components';

const Trips = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showTrailerForm, setShowTrailerForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [creatingTrailer, setCreatingTrailer] = useState(false);
    const [error, setError] = useState("");
    const [trailerError, setTrailerError] = useState("");

    const [trucks, setTrucks] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [trailerFormData, setTrailerFormData] = useState({
        registrationNumber: '',
        type: 'Plateau',
        model: '',
        year: '',
        payload: ''
    });

    const [formData, setFormData] = useState({
        departureCity: '',
        arrivalCity: '',
        startDate: '',
        driver: '',
        truck: '',
        trailer: '',
        startKm: ''
    });

    useEffect(() => {
        fetchTrips();
        loadResources();
    }, []);

    const fetchTrips = async () => {
        try {
            const res = await tripService.getTrips();
            if (res.success) {
                const tripsData = res.data.data || res.data;
                setTrips(Array.isArray(tripsData) ? tripsData : []);
            }
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadResources = async () => {
        try {
            const tRes = await truckService.getTrucks();
            if (tRes.success) {
                const trucksData = tRes.data.data || tRes.data;
                const trucksArray = Array.isArray(trucksData) ? trucksData : [];
                setTrucks(trucksArray.filter(t => t.status === 'Disponible'));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des camions:", error);
        }

        try {
            const trRes = await trailerService.getTrailers();
            if (trRes.success) {
                const trailersData = trRes.data.data || trRes.data;
                const trailersArray = Array.isArray(trailersData) ? trailersData : [];
                const availableTrailers = trailersArray.filter(t => t.status === 'Disponible');
                setTrailers(availableTrailers);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des remorques:", error);
        }

        try {
            const driversRes = await driverService.getDrivers();
            if (driversRes.success) {
                const driversData = driversRes.data.data || driversRes.data;
                setDrivers(Array.isArray(driversData) ? driversData : []);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des chauffeurs:", error);
        }
    };

    const handleCreateTrailer = async (e) => {
        e.preventDefault();
        setTrailerError("");
        setCreatingTrailer(true);

        try {
            const trailerData = {
                registrationNumber: trailerFormData.registrationNumber.trim(),
                type: trailerFormData.type,
                model: trailerFormData.model.trim(),
                year: Number(trailerFormData.year),
                payload: Number(trailerFormData.payload)
            };

            const res = await trailerService.createTrailer(trailerData);
            
            if (res.success) {
                setShowTrailerForm(false);
                setTrailerFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
                setTrailerError("");
                await loadResources();
            } else {
                const errorMessage = res.message || res.data?.message || "Erreur lors de la création de la remorque";
                setTrailerError(errorMessage);
            }
        } catch (error) {
            console.error("Erreur création remorque:", error);
            setTrailerError(error.message || "Erreur lors de la création de la remorque");
        } finally {
            setCreatingTrailer(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        setCreating(true);

        try {
            const tripData = {
                departureCity: formData.departureCity.trim(),
                arrivalCity: formData.arrivalCity.trim(),
                startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
                driver: formData.driver,
                truck: formData.truck,
                trailer: formData.trailer,
                startKm: Number(formData.startKm)
            };

            const res = await tripService.createTrip(tripData);
            
            if (res.success) {
                setShowForm(false);
                setFormData({ 
                    departureCity: '', 
                    arrivalCity: '', 
                    startDate: '', 
                    driver: '', 
                    truck: '', 
                    trailer: '', 
                    startKm: '' 
                });
                setError("");
                fetchTrips();
            } else {
                const errorMessage = res.message || res.data?.message || "Erreur lors de la création du trajet";
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Erreur création trajet:", error);
            setError(error.message || "Erreur lors de la création du trajet");
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    Gestion des Trajets
                </h2>
                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5)] transition-all duration-300 border border-orange-400/30" onClick={() => setShowForm(true)}>
                    Nouveau Trajet
                </Button>
            </div>

            <Modal 
                isOpen={showForm} 
                onClose={() => {
                    setShowForm(false);
                    setError("");
                    setFormData({ departureCity: '', arrivalCity: '', startDate: '', driver: '', truck: '', trailer: '', startKm: '' });
                }}
                title="Créer un Nouveau Trajet"
                size="lg"
            >
                {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input label="Départ" value={formData.departureCity} onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Arrivée" value={formData.arrivalCity} onChange={(e) => setFormData({ ...formData, arrivalCity: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Date Début" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Km Départ" type="number" value={formData.startKm} onChange={(e) => setFormData({ ...formData, startKm: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-blue-300">Camion</label>
                            <select className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={formData.truck} onChange={(e) => setFormData({ ...formData, truck: e.target.value })} required>
                                <option value="">Sélectionner un camion</option>
                                {trucks.length === 0 ? (
                                    <option value="" disabled>Aucun camion disponible</option>
                                ) : (
                                    trucks.map(t => (
                                        <option key={t._id} value={t._id}>
                                            {t.registrationNumber} {t.make ? `- ${t.make} ${t.model || ''}` : ''}
                                        </option>
                                    ))
                                )}
                            </select>
                            {trucks.length === 0 && (
                                <p className="text-xs text-orange-400 mt-1">
                                    Aucun camion disponible. Veuillez en créer un ou attendre qu'un camion soit libéré.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-blue-300">Remorque</label>
                                <button
                                    type="button"
                                    onClick={() => setShowTrailerForm(true)}
                                    className="text-xs text-blue-400 hover:text-blue-300 underline"
                                >
                                    + Ajouter une remorque
                                </button>
                            </div>
                            <select className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={formData.trailer} onChange={(e) => setFormData({ ...formData, trailer: e.target.value })} required>
                                <option value="">Sélectionner une remorque</option>
                                {trailers.length === 0 ? (
                                    <option value="" disabled>Aucune remorque disponible</option>
                                ) : (
                                    trailers.map(t => (
                                        <option key={t._id} value={t._id}>
                                            {t.registrationNumber} - {t.type} {t.model ? `(${t.model})` : ''}
                                        </option>
                                    ))
                                )}
                            </select>
                            {trailers.length === 0 && (
                                <div className="text-xs text-orange-400 mt-1 space-y-1">
                                    <p>Aucune remorque disponible.</p>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/admin/fleet/trailers')}
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        Aller à la gestion des remorques
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-blue-300">Chauffeur</label>
                            <select className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={formData.driver} onChange={(e) => setFormData({ ...formData, driver: e.target.value })} required>
                                <option value="">Sélectionner un chauffeur</option>
                                {drivers.map(driver => (
                                    <option key={driver._id || driver.id} value={driver._id || driver.id}>
                                        {driver.firstName} {driver.lastName} ({driver.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button 
                            type="submit" 
                            disabled={creating}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {creating ? "Création en cours..." : "Créer le Trajet"}
                        </Button>
                        <Button 
                            type="button" 
                            onClick={() => {
                                setShowForm(false);
                                setError("");
                                setFormData({ departureCity: '', arrivalCity: '', startDate: '', driver: '', truck: '', trailer: '', startKm: '' });
                            }}
                            disabled={creating}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal 
                isOpen={showTrailerForm} 
                onClose={() => {
                    setShowTrailerForm(false);
                    setTrailerError("");
                    setTrailerFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
                }}
                title="Ajouter une Remorque"
                size="lg"
            >
                {trailerError && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-sm">
                        {trailerError}
                    </div>
                )}
                <form onSubmit={handleCreateTrailer} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input 
                            label="Immatriculation" 
                            value={trailerFormData.registrationNumber} 
                            onChange={(e) => setTrailerFormData({ ...trailerFormData, registrationNumber: e.target.value })} 
                            className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" 
                            required 
                        />
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-blue-300">Type</label>
                            <select
                                className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={trailerFormData.type}
                                onChange={(e) => setTrailerFormData({ ...trailerFormData, type: e.target.value })}
                            >
                                {['Plateau', 'Frigo', 'Citerne', 'Benne', 'Porte-Conteneur'].map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <Input 
                            label="Modèle" 
                            value={trailerFormData.model} 
                            onChange={(e) => setTrailerFormData({ ...trailerFormData, model: e.target.value })} 
                            className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" 
                            required 
                        />
                        <Input 
                            label="Année" 
                            type="number" 
                            value={trailerFormData.year} 
                            onChange={(e) => setTrailerFormData({ ...trailerFormData, year: e.target.value })} 
                            className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" 
                            required 
                        />
                        <Input 
                            label="Charge Utile (T)" 
                            type="number" 
                            value={trailerFormData.payload} 
                            onChange={(e) => setTrailerFormData({ ...trailerFormData, payload: e.target.value })} 
                            placeholder="0" 
                            min="0" 
                            step="0.01" 
                            className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" 
                            required 
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button 
                            type="submit" 
                            disabled={creatingTrailer}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {creatingTrailer ? "Création en cours..." : "Créer la Remorque"}
                        </Button>
                        <Button 
                            type="button" 
                            onClick={() => {
                                setShowTrailerForm(false);
                                setTrailerError("");
                                setTrailerFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
                            }}
                            disabled={creatingTrailer}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </Modal>

            <div className="bg-slate-900/80 rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl">
                <table className="w-full text-left text-blue-100">
                    <thead className="bg-slate-950 text-orange-400 uppercase text-xs tracking-wider border-b border-blue-500/20">
                        <tr>
                            <th className="p-5 font-bold">Trajet</th>
                            <th className="p-5 font-bold">Chauffeur</th>
                            <th className="p-5 font-bold">Véhicule</th>
                            <th className="p-5 font-bold">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-500/10">
                        {trips.map(t => (
                            <tr key={t._id} className="hover:bg-blue-900/10 transition-colors duration-200">
                                <td className="p-5">
                                    <div className="font-bold text-white group-hover:text-orange-300 transition-colors">{t.departureCity} ➝ {t.arrivalCity}</div>
                                    <div className="text-xs text-blue-400">{new Date(t.startDate).toLocaleDateString()}</div>
                                </td>
                                <td className="p-5 text-sm">
                                    {t.driver ? (
                                        typeof t.driver === 'object' 
                                            ? `${t.driver.firstName || ''} ${t.driver.lastName || ''}`.trim() || t.driver.email || 'N/A'
                                            : t.driver
                                    ) : 'N/A'}
                                </td>
                                <td className="p-5 text-sm">{t.truck?.registrationNumber} / {t.trailer?.registrationNumber}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-blue-900/50 text-blue-300 border border-blue-500/30`}>
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trips;
