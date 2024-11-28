import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, '../protos/order.proto');
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'localhost:50052';

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Crear un paquete gRPC basado en la definición
const orderProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Crear cliente para OrderService
const orderClient = new orderProto.order.OrderService(
    ORDER_SERVICE_URL,
    grpc.credentials.createInsecure()
);

// Validar conexión con el servicio
orderClient.waitForReady(Date.now() + 5000, (error: { message: any; }) => {
    if (error) {
        console.error('Error connecting to OrderService:', error.message);
    } else {
        console.log('Connected to OrderService');
    }
});

export default orderClient;