import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import dotenv from 'dotenv';
import { CustomerService } from './services/CustomerService';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, './grpc/customer.proto');

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

        const customerProto = grpc.loadPackageDefinition(packageDefinition) as any;
        const customerService = new CustomerService();

        const serviceImplementation = {
            CreateCustomer: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await customerService.createCustomer(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },
            GetCustomer: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const customer_id = call.request.customer_id;
                    const response = await customerService.getCustomer(customer_id);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: String(error) });
                }
            },
            GetCustomers: async (_call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await customerService.getCustomers();
                    callback(null, { success: response.success, message: response.message, data: response.data });
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },

        };

        const server = new grpc.Server();

        // Agregar servicio al servidor
        if (customerProto && customerProto.customer && customerProto.customer.CustomerService) {
            server.addService(customerProto.customer.CustomerService.service, serviceImplementation);

            // Configurar el puerto del servidor
            const port = process.env.CUSTOMER_SERVICE_URL || '0.0.0.0:50054';

            server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
                if (error) {
                    console.error('Error al iniciar el servidor gRPC:', error);
                    return;
                }
                console.log(`Servidor gRPC de CustomerService corriendo en ${boundPort}`);
            });
        } else {
            throw new Error('CustomerService no encontrado en la definición del proto.');
        }
    } catch (error) {
        console.error('Error en el servidor gRPC:', error);
    } 
}        