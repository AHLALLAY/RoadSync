import { useState, useEffect } from 'react';
import truckService from '../../service/truckService';
import { Button, Input, Modal } from '../../components';

const Trucks = () => {
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        registrationNumber: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        tankCapacity: '',
        fuelType: 'Diesel'
    });

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const res = await truckService.getTrucks();
            if (res.success) {
                // Gérer la structure de données du backend
                const trucksData = res.data.data || res.data;
                setTrucks(Array.isArray(trucksData) ? trucksData : []);
            }
        } catch (error) {
            console.error("Erreur fetching trucks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await truckService.createTruck(formData);
            if (res.success) {
                setShowForm(false);
                fetchTrucks();
                setFormData({ registrationNumber: '', make: '', model: '', year: '', mileage: '', tankCapacity: '', fuelType: 'Diesel' });
            } else {
                alert(res.message || res.data?.message || "Erreur lors de la création");
            }
        } catch (error) {
            alert("Erreur lors de la création");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr ?")) {
            await truckService.deleteTruck(id);
            fetchTrucks();
        }
    }

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    Gestion des Camions
                </h2>
                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5)] transition-all duration-300 border border-orange-400/30" onClick={() => setShowForm(true)}>
                    Ajouter un Camion
                </Button>
            </div>

            <Modal 
                isOpen={showForm} 
                onClose={() => {
                    setShowForm(false);
                    setFormData({ registrationNumber: '', make: '', model: '', year: '', mileage: '', tankCapacity: '', fuelType: 'Diesel' });
                }}
                title="Ajouter un Camion"
                size="lg"
            >
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input label="Immatriculation" value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} placeholder="AA-123-BB" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Marque" value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} placeholder="Volvo" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Modèle" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="FH16" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Année" type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Kilométrage" type="number" value={formData.mileage} onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })} placeholder="0" min="0" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Capacité Réservoir (L)" type="number" value={formData.tankCapacity} onChange={(e) => setFormData({ ...formData, tankCapacity: parseInt(e.target.value) })} placeholder="0" min="0" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-blue-300">Type de Carburant</label>
                            <select className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={formData.fuelType} onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}>
                                {['Diesel', 'Essence', 'Hybride', 'Electrique'].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-[1.02]">
                            Enregistrer
                        </Button>
                        <Button type="button" onClick={() => {
                            setShowForm(false);
                            setFormData({ registrationNumber: '', make: '', model: '', year: '', mileage: '', tankCapacity: '', fuelType: 'Diesel' });
                        }} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                            Annuler
                        </Button>
                    </div>
                </form>
            </Modal>

            <div className="bg-slate-900/80 rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl">
                <table className="w-full text-left text-blue-100">
                    <thead className="bg-slate-950 text-orange-400 uppercase text-xs tracking-wider border-b border-blue-500/20">
                        <tr>
                            <th className="p-5 font-bold">Matricule</th>
                            <th className="p-5 font-bold">Marque/Modèle</th>
                            <th className="p-5 font-bold">Statut</th>
                            <th className="p-5 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-500/10">
                        {trucks.map(truck => (
                            <tr key={truck._id} className="hover:bg-blue-900/10 transition-colors duration-200">
                                <td className="p-5 font-medium text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]">{truck.registrationNumber}</td>
                                <td className="p-5">{truck.make || truck.brand} {truck.model}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(0,0,0,0.2)] ${truck.status === 'Disponible' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'}`}>
                                        {truck.status}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <button onClick={() => handleDelete(truck._id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1 rounded transition-colors text-sm font-medium">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        {trucks.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500 italic">Aucun camion enregistré.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trucks;
