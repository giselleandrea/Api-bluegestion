import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, '../protos/customer.proto');
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'localhost:50054';

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Crear un paquete gRPC basado en la definición
const customerProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Crear cliente para CustomerService
const customerClient = new customerProto.customer.CustomerService(
    CUSTOMER_SERVICE_URL,
    grpc.credentials.createInsecure()
);

// Validar conexión con el servicio
customerClient.waitForReady(Date.now() + 5000, (error: { message: any; }) => {
    if (error) {
        console.error('Error connecting to CustomerService:', error.message);
    } else {
        console.log('Connected to CustomerService');
    }
});

export default customerClient;