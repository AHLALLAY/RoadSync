import mongoose from 'mongoose';

const trailerSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, "Le matricule de la remorque est requis"],
        unique: true, 
        trim: true,
    },
    type: {
        type: String,
        enum: {
            values: ['Plateau', 'Frigo', 'Citerne', 'Benne', 'Porte-Conteneur'],
            message: '{VALUE} n\'est pas un type de remorque valide'
        },
        required: [true, "Le type de remorque est requis"],
        default: 'Plateau'
    },
    payload: {
        type: Number,
        required: [true, "La charge utile est requise (en Tonnes)"],
        min: [0, "La charge ne peut pas être négative"]
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
    }
}, {
    timestamps: true
});

export default mongoose.model('Trailer', trailerSchema);