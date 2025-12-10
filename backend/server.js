import express from 'express';
import 'dotenv/config';
import dbConnection from './database/ConnexionDB.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use('/api/auth', authRoutes);

app.get('/', (req, res)=>{
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