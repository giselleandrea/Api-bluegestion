import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import dotenv from 'dotenv';
import { AuthService } from './services/AuthService';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, './grpc/auth.proto');

export default async function startGrpcServer() {
    try {
        // Cargar el archivo .proto usando proto-loader
        const packageDefinition = await protoLoader.load(PROTO_PATH, {
            keepCase: true, // Mantener mayúsculas y minúsculas
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        // Convertir la definición del paquete para gRPC
        const authProto = grpc.loadPackageDefinition(packageDefinition) as any;

        // Verifica la estructura de authProto
        //console.log('authProto:', authProto);

        const authService = new AuthService();

        const serviceImplementation = {
            login: async (call: any, callback: any) => {
                try {
                    const response = await authService.login(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.UNAUTHENTICATED, message: error });
                }
            },
            createUser: async (call: any, callback: any) => {
                try {
                    const response = await authService.createUser(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: error });
                }
            },
        };

        const server = new grpc.Server();

        // Asegúrate de que `auth.AuthService` existe
        if (authProto && authProto.auth && authProto.auth.AuthService) {
            server.addService(authProto.auth.AuthService.service, serviceImplementation);

            const port = process.env.AUTH_SERVICE_URL || '0.0.0.0:50051';

            server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (error, port) => {
                if (error) {
                    console.error('Error starting server:', error);
                    return;
                }
                console.log(`Auth Service gRPC server running at ${port}`);
            });
        } else {
            throw new Error('AuthService not found in proto definition.');
        }
    } catch (error) {
        console.error('Error in gRPC server:', error);
    }
}

