import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, '../protos/branch.proto');
const BRANCH_SERVICE_URL = process.env.BRANCH_SERVICE_URL || 'localhost:50055';

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Crear un paquete gRPC basado en la definición
const branchProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Crear cliente para BranchtService
const branchClient = new branchProto.branch.BranchService(
    BRANCH_SERVICE_URL,
    grpc.credentials.createInsecure()
);

// Validar conexión con el servicio
branchClient.waitForReady(Date.now() + 5000, (error: { message: any; }) => {
    if (error) {
        console.error('Error connecting to BranchtService:', error.message);
    } else {
        console.log('Connected to BranchtService');
    }
});

export default branchClient;