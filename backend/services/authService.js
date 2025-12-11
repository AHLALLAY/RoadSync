import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import validation from '../utils/validation.js';
import jwt from 'jsonwebtoken';

class AuthService {
    async register(userData) {
        const { firstName, lastName, email, password, birthDay, cin, phone, role } = userData;
        if (!firstName || !lastName || !email || !password || !birthDay || !cin || !phone || !role) {
            throw new Error("Veuillez remplir tous les champs");
        }
        if (!validation.isValidEmail(email)) {
            throw new Error("L'émail invalide");
        }

        if (!validation.isValidPassword(password)) {
            throw new Error("Le mot de passe invalide");
        }
        if (await User.findOne({ email })) {
            throw new Error("L'email existe déjà");
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
            token: token
        };
    }

    async login(identifiant) {
        const { email, password } = identifiant;
        if (!email || !password) {
            throw new Error("Veuillez remplir tous les champs");
        }
        if (!validation.isValidEmail(email)) {
            throw new Error("L'émail invalide");
        }

        if (!validation.isValidPassword(password)) {
            throw new Error("Le mot de passe invalide");
        }
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
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
                    role: user.role,
                    token: token
                };
            } else {
                throw new Error("L'email ou le mot de passe n'est pas correct");
            }
        } else {
            throw new Error("L'utilisateur introuvable");
        }
    }

}

export default new AuthService();