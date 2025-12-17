import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import validation from '../utils/validation.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

class AuthService {
    async register(userData) {
        const { firstName, lastName, email, password, birthDay, cin, phone, role } = userData;
        if (!firstName || !lastName || !email || !password || !birthDay || !cin || !phone || !role) {
            throw AppError.validation("Veuillez remplir tous les champs");
        }
        if (!validation.isValidEmail(email)) {
            throw AppError.validation("L'email est invalide");
        }
        if (!validation.isValidPassword(password)) {
            throw AppError.validation("Le mot de passe est invalide");
        }
        if (await User.findOne({ email })) {
            throw AppError.duplicate("email", email);
        }

        const hashedpwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedpwd,
            birthDay,
            cin,
            phone,
            role
        });
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            birthDay: newUser.birthDay,
            cin: newUser.cin,
            phone: newUser.phone,
            role: newUser.role,
            token
        };
    }

    async login(identifiant) {
        const { email, password } = identifiant;
        if (!email || !password) {
            throw AppError.validation("Veuillez remplir tous les champs");
        }
        if (!validation.isValidEmail(email)) {
            throw AppError.validation("L'email est invalide");
        }
        if (!validation.isValidPassword(password)) {
            throw AppError.validation("Le mot de passe est invalide");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw AppError.unauthorized("L'email ou le mot de passe n'est pas correct");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw AppError.unauthorized("L'email ou le mot de passe n'est pas correct");
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            cin: user.cin,
            birthDay: user.birthDay,
            role: user.role,
            token
        };
    }

    async getDrivers() {
        return await User.find({ role: 'Chauffeur' }).select('-password');
    }
}

export default new AuthService();