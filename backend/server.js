import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnection from './database/ConnexionDB.js';
import authRoutes from './routes/authRoutes.js';
import truckRoutes from './routes/truckRoutes.js';

const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin/', truckRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenu chez RoadSync');
});

const startServer = async () => {
    try {
        await dbConnection.connectToDb(uri);

        app.listen(port, () => {
            console.info(`Server is running on : http://localhost:${port}/`);
        });
    } catch (e) {
        console.error(`Erreur de connexion avec la base de donnée : ${e.message}`);
        process.exit(1);
    }

}

startServer();