import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import driverService from '../../service/driverService';
import { Button, Input } from '../../components';

const TripDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [endKm, setEndKm] = useState('');
    const [fuelRefillLitres, setFuelRefillLitres] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await driverService.getTripDetail(id);
                if (res.success) {
                    setTrip(res.data.data);
                    if (res.data.data.endKm) setEndKm(res.data.data.endKm.toString());
                    if (res.data.data.fuelRefillLitres) setFuelRefillLitres(res.data.data.fuelRefillLitres.toString());
                    if (res.data.data.remarks) setRemarks(res.data.data.remarks);
                }
            } catch (e) {
                console.error("Error fetching trip detail:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        if (newStatus === 'Completed' && !endKm) {
            alert("Veuillez saisir le kilométrage de fin.");
            return;
        }

        if (window.confirm(`Passer le statut à ${newStatus} ?`)) {
            try {
                const fuelValue = fuelRefillLitres ? parseFloat(fuelRefillLitres) : null;
                const res = await driverService.updateStatus(
                    id, 
                    newStatus, 
                    newStatus === 'Completed' ? parseFloat(endKm) : null,
                    fuelValue,
                    remarks || null
                );
                if (res.success) {
                    const updatedTrip = { 
                        ...trip, 
                        status: newStatus, 
                        endKm: newStatus === 'Completed' ? parseFloat(endKm) : trip.endKm,
                        fuelRefillLitres: fuelValue,
                        remarks: remarks
                    };
                    setTrip(updatedTrip);
                    if (newStatus === 'Completed') navigate('/driver/dashboard');
                }
            } catch (e) {
                alert("Erreur lors de la mise à jour");
            }
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (!trip) return <div>Trajet introuvable</div>;

    const isCompleted = trip.status === 'Completed';

    return (
        <div>
            <Button onClick={() => navigate('/driver/trips')} style="mb-4 bg-gray-700">← Retour</Button>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Détails Mission</h2>
                    <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded">{trip.status}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-gray-400 text-sm">Départ</p>
                        <p className="text-xl font-bold">{trip.departureCity}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Arrivée</p>
                        <p className="text-xl font-bold">{trip.arrivalCity}</p>
                    </div>
                </div>

                {!isCompleted && (
                    <div className="border-t border-gray-700 pt-6 space-y-4">
                        <h3 className="font-bold text-white">Actions</h3>

                        {trip.status === 'Planned' && (
                            <Button onClick={() => handleStatusChange('InProgress')} style="w-full bg-blue-600 hover:bg-blue-500">
                                Démarrer le trajet
                            </Button>
                        )}

                        {trip.status === 'InProgress' && (
                            <div className="bg-gray-900 p-4 rounded space-y-4">
                                <Input
                                    label="Kilométrage Arrivée"
                                    type="number"
                                    value={endKm}
                                    onChange={(e) => setEndKm(e.target.value)}
                                    placeholder={` > ${trip.startKm}`}
                                    required
                                />
                                <Input
                                    label="Volume de gasoil ajouté (L)"
                                    type="number"
                                    value={fuelRefillLitres}
                                    onChange={(e) => setFuelRefillLitres(e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Remarques
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Ajoutez des remarques sur le trajet..."
                                        rows="3"
                                    />
                                </div>
                                <Button onClick={() => handleStatusChange('Completed')} style="w-full bg-green-600 hover:bg-green-500">
                                    Terminer la mission
                                </Button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default TripDetail;
