import bcrypt from bcryptjs;
import User from '../models/UserModel';
import validation from '../utils/validation';

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
            { newUser_id: newUser._id },
            process.env.JWT_SECRET,
            { expiredIn: '1h' }
        );
        return {
            user: {
                id:newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                birthDay: newUser.birthDay,
                cin: newUser.cin,
                phone: newUser.phone,
                role: newUser.role
            },
            token: token
        };

    }
}

export default new AuthService();