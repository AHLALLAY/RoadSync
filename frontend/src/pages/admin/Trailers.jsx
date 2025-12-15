import { useState, useEffect } from 'react';
import trailerService from '../../service/trailerService';
import { Button, Input, Modal } from '../../components';

const Trailers = () => {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        registrationNumber: '',
        type: 'Plateau',
        model: '',
        year: '',
        payload: ''
    });

    useEffect(() => {
        fetchTrailers();
    }, []);

    const fetchTrailers = async () => {
        try {
            const res = await trailerService.getTrailers();
            if (res.success) {
                const trailersData = res.data.data || res.data;
                setTrailers(Array.isArray(trailersData) ? trailersData : []);
            }
        } catch (error) {
            console.error("Erreur fetching trailers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await trailerService.createTrailer(formData);
            if (res.success) {
                setShowForm(false);
                fetchTrailers();
                setFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
            } else {
                alert(res.message);
            }
        } catch (error) {
            alert("Erreur création");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ?")) {
            await trailerService.deleteTrailer(id);
            fetchTrailers();
        }
    }

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    Gestion des Remorques
                </h2>
                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5)] transition-all duration-300 border border-orange-400/30" onClick={() => setShowForm(true)}>
                    Ajouter une Remorque
                </Button>
            </div>

            <Modal 
                isOpen={showForm} 
                onClose={() => {
                    setShowForm(false);
                    setFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
                }}
                title="Ajouter une Remorque"
                size="lg"
            >
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input label="Immatriculation" value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-blue-300">Type</label>
                            <select
                                className="px-4 py-3 border border-blue-500/30 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                {['Plateau', 'Frigo', 'Citerne', 'Benne', 'Porte-Conteneur'].map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <Input label="Modèle" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Année" type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                        <Input label="Charge Utile (T)" type="number" value={formData.payload} onChange={(e) => setFormData({ ...formData, payload: parseFloat(e.target.value) })} placeholder="0" min="0" step="0.01" className="bg-slate-800 border-blue-500/30 text-white focus:border-orange-500 focus:ring-orange-500/50" required />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-[1.02]">
                            Enregistrer
                        </Button>
                        <Button type="button" onClick={() => {
                            setShowForm(false);
                            setFormData({ registrationNumber: '', type: 'Plateau', model: '', year: '', payload: '' });
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
                            <th className="p-5 font-bold">Type</th>
                            <th className="p-5 font-bold">Modèle</th>
                            <th className="p-5 font-bold">Statut</th>
                            <th className="p-5 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-500/10">
                        {trailers.map(t => (
                            <tr key={t._id} className="hover:bg-blue-900/10 transition-colors duration-200">
                                <td className="p-5 font-medium text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]">{t.registrationNumber}</td>
                                <td className="p-5">{t.type}</td>
                                <td className="p-5">{t.model}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(0,0,0,0.2)] ${t.status === 'Disponible' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <button onClick={() => handleDelete(t._id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1 rounded transition-colors text-sm font-medium">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trailers;
