import bcrypt from bcryptjs;
import User from '../models/UserModel';

class AuthService {
    async register(userData) {
        const { firstName, lastName, email, password, birthDay, cin, phone, role } = userData;
        if (!firstName || !lastName || !email || !password || !birthDay || !cin || !phone || !role) {
            throw new Error("Veuillez remplir tous les champs");
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


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import User from '../models/user.js';
// import validation from '../utils/validation.js';

// class AuthService {
//     async register(userData) {
//         const { fullName, email, password } = userData;
//         if (!fullName || !email || !password) {
//             throw new Error("Veuillez remplir tous les champs");

//         }

//         if (!validation.isValidEmail(email)) {
//             throw new Error("L'émail invalide");
//         }

//         if (!validation.isValidPassword(password)) {
//             throw new Error("Le mot de passe invalide");
//         }

//         if (await User.findOne({ email })) {
//             throw new Error("L'email existe déjà");
//         }

//         const hashedPass = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             fullName,
//             email,
//             password: hashedPass
//         });
//         const token = jwt.sign(
//             { newUser_id: newUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         return {
//             user: {
//                 userId: newUser._id,
//                 userName: newUser.fullName,
//                 userEmail: newUser.email
//             },
//             token: token
//         };
//     }

//     async login(identifiant) {
//         const { email, password } = identifiant;
//         if (!email || !password) {
//             throw new Error("Veuillez remplir tous les champs");
//         }
//         if (!validation.isValidEmail(email)) {
//             throw new Error("L'émail invalide");
//         }

//         if (!validation.isValidPassword(password)) {
//             throw new Error("Le mot de passe invalide");
//         }
//         const user = await User.findOne({ email });
//         if (user) {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 const token = jwt.sign(
//                     { user_id: user._id },
//                     process.env.JWT_SECRET,
//                     { expiresIn: '1h' }
//                 );

//                 return {
//                     user: {
//                         userId: user._id,
//                         userName: user.fullName,
//                         userEmail: user.email
//                     },
//                     token: token
//                 };
//             } else {
//                 throw new Error("L'email ou le mot de passe n'est pas correct");
//             }
//         } else {
//             throw new Error("L'utilisateur introuvable");
//         }
//     }
// }

// export default new AuthService();