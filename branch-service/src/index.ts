import dotenv from 'dotenv';
import AppDataSource from '../../data-source';
import startGrpcServer from './grpcServer';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Iniciar la conexión con la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        // Iniciar el servidor gRPC después de la conexión
        startGrpcServer();
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });