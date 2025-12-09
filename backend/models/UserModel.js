import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        maxLength: [50, "Max length is 50 characters"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "Min length is 8 characters"],
    },
    birthDay: {
        type: Date,
        required: [true, "birth day is required"]
    },
    cin: {
        type: String,
        required: [true, "CIN is required"],
        unique: true,
        minLength: [5, "Min length is 5 characters"],
        maxLength: [10, "Max length is 10 characters"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Chauffeur'],
        default: 'Chauffeur',
        required: [true, "Role is required"],
        trim: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model('User', userSchema);