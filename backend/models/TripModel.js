import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    departureCity: {
        type: String,
        required: [true, "La ville de départ est requise"],
        trim: true
    },
    arrivalCity: {
        type: String,
        required: [true, "La ville d'arrivée est requise"],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, "La date de départ est requise"],
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Le chauffeur est requis"]
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: [true, "Le camion est requis"]
    },
    trailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trailer',
        required: [true, "La remorque est requise"]
    },
    status: {
        type: String,
        enum: {
            values: ['Planned', 'InProgress', 'Completed', 'Cancelled'],
            message: '{VALUE} n\'est pas un statut valide'
        },
        default: 'Planned'
    },
    startKm: {
        type: Number,
        required: [true, "Le compteur kilomètrique au départ est requis"],
        min: 0
    },
    endKm: {
        type: Number,
        min: 0
    },
    distanceKm: {
        type: Number,
        default: 0
    },
    fuelRefillLitres: {
        type: Number,
        default: 0,
        min: 0
    },
    theoreticalConsumption: {
        type: Number,
        default: 0
    },
    isSuspicious: {
        type: Boolean,
        default: false
    },
    receiptImage: {
        type: String,
    }

}, {
    timestamps: true
});

export default mongoose.model('Trip', tripSchema);