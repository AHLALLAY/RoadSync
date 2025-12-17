import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cors from 'cors';
import dbConnection from './database/ConnexionDB.js';
import authRoutes from './routes/authRoutes.js';
import truckRoutes from './routes/truckRoutes.js';
import trailerRoutes from './routes/trailerRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(cors());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin/', truckRoutes);
app.use('/api/admin/', trailerRoutes);
app.use('/api/admin/', tripRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue chez RoadSync');
});

app.use(errorMiddleware.notFoundHandler);
app.use(errorMiddleware.errorHandler);

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
};

startServer();