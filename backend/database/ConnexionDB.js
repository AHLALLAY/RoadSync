import mongoose from 'mongoose';

class Connection {
    constructor() {
        this.isConnected = false;
    }

    async connectToDb(uri) {
        if (!uri) {
            console.error('Erreur Fatale : MONGO_URI n\'est pas défini dans le .env');
            process.exit(1);
        }

        if (this.isConnected) {
            console.log('Base de données déjà connectée');
            return;
        }

        try {
            const conn = await mongoose.connect(uri);
            this.isConnected = true;
            console.log("MongoDB Connecté");
            return conn;
        } catch (error) {
            console.error(`Erreur de connexion MongoDB : ${error.message}`);
            process.exit(1);
        }
    }
}

export default new Connection();