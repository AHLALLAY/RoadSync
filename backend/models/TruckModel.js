import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
    registrationNumber: { 
        type: String,
        required: [true, "Le matricule est requis"],
        unique: true,
        trim: true
    },
    make: { 
        type: String,
        required: [true, "La marque est requise"],
        trim: true
    },
    model: {
        type: String,
        required: [true, "Le modèle est requis"],
        trim: true
    },
    year: {
        type: Number,
        required: [true, "L'année de mise en service est requise"],
    },
    status: {
        type: String,
        enum: ['Disponible', 'En voyage', 'Maintenance'], 
        default: 'Disponible'
    },
    mileage: { 
        type: Number,
        required: [true, "Le kilométrage est requis"],
        min: [0, "Le kilométrage ne peut pas être négatif"]
    },
    tankCapacity: {
        type: Number,
        required: [true, "La capacité du réservoir est requise"],
        min: [0, "La capacité ne peut pas être négative"]
    },
    fuelType: {
        type: String,
        enum: ['Diesel', 'Essence', 'Hybride', 'Electrique'], 
        default: 'Diesel'
    },
}, {
    timestamps: true
});

export default mongoose.model('Truck', truckSchema);