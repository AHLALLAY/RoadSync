import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Le prénom est requis"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Le nom est requis"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: true,
        maxLength: [50, "L'email ne peut pas dépasser 50 caractères"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minLength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
    },
    birthDay: {
        type: Date,
        required: [true, "La date de naissance est requise"]
    },
    cin: {
        type: String,
        required: [true, "Le CIN est requis"],
        unique: true,
        minLength: [5, "Le CIN doit contenir au moins 5 caractères"],
        maxLength: [10, "Le CIN ne peut pas dépasser 10 caractères"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Le numéro de téléphone est requis"],
        trim: true
    },
    role: {
        type: String,
        required: [true, "Le rôle est requis"],
        enum: {
            values: ['Admin', 'Chauffeur'],
            message: '{VALUE} n\'est pas un rôle valide'
        },
        default: 'Chauffeur',
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);