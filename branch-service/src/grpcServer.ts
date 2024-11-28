import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import dotenv from 'dotenv';
import { BranchService } from './services/BranchService';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, './grpc/branch.proto')

export default async function startGrpcServer() {
    try {
        // Cargar el archivo .proto usando proto-loader
        const packageDefinition = await protoLoader.load(PROTO_PATH, {
            keepCase: true, 
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const branchProto = grpc.loadPackageDefinition(packageDefinition) as any;
        const branchService = new BranchService();

        const serviceImplementation = {
            CreateBranch: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await branchService.createBranch(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },
            GetBranch: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const branchId = call.request.branchId;
                    const response = await branchService.getBranch(branchId);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: String(error) });
                }
            },
            GetBranches: async (_call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await branchService.getBranches();
                    callback(null, { success: response.success, message: response.message, data: response.data });
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },

        };

        const server = new grpc.Server();

        // Agregar servicio al servidor
        if (branchProto && branchProto.branch && branchProto.branch.BranchService) {
            server.addService(branchProto.branch.BranchService.service, serviceImplementation);

            // Configurar el puerto del servidor
            const port = process.env.BRANCH_SERVICE_URL || '0.0.0.0:50055';

            server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
                if (error) {
                    console.error('Error al iniciar el servidor gRPC:', error);
                    return;
                }
                console.log(`Servidor gRPC de BranchService corriendo en ${boundPort}`);
            });
        } else {
            throw new Error('BranchService no encontrado en la definición del proto.');
        }
    } catch (error) {
        console.error('Error en el servidor gRPC:', error);
    } 
}        