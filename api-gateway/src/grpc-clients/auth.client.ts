import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, '../protos/auth.proto');
const AUTH_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'localhost:50051';

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Crear cliente gRPC
const authClient = new authProto.auth.AuthService(
    AUTH_SERVICE_URL,
    grpc.credentials.createInsecure()
);

// Validar conexión con el servicio
authClient.waitForReady(Date.now() + 5000, (error: { message: any; }) => {
    if (error) {
        console.error('Error connecting to AuthService:', error.message);
    } else {
        console.log('Connected to AuthService');
    }
});

export default authClient;
