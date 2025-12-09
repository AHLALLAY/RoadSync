import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: [true, "Le matricule est requis"],
        unique: true,
        trim: true
    },
    marque: {
        type: String,
        required: [true, "La marque est requise"],
        trim: true
    },
    modele: {
        type: String,
        required: [true, "Le modèle est requis"],
        trim: true
    },
    annee: {
        type: Number,
        required: [true, "L'année de mise en service est requise"],
    },
    status: {
        type: String,
        enum: ['Disponible', 'En voyage', 'Maintenance'],
        default: 'Disponible'
    },
    compteurKm: {
        type: Number,
        required: [true, "Le kilométrage est requis"],
        min: [0, "Le kilométrage ne peut pas être négatif"]
    },
    capaciteReservoir: {
        type: Number,
        required: [true, "La capacité du réservoir est requise"],
        min: [0, "La capacité ne peut pas être négative"]
    },
    typeCarburant: {
        type: String,
        enum: ['Diesel', 'Essence', 'Hybride', 'Electrique'],
        default: 'Diesel'
    },
}, {
    timestamps: true
});

export default mongoose.model('Truck', truckSchema);