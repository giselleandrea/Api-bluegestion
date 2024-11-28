import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import dotenv from 'dotenv';
import { OrderService } from './services/OrderService';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PROTO_PATH = path.join(__dirname, './grpc/order.proto');

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

        // Cargar el paquete del archivo .proto
        const orderProto = grpc.loadPackageDefinition(packageDefinition) as any;

        // Instancia del servicio de órdenes
        const orderService = new OrderService();

        // Implementación del servicio gRPC
        const serviceImplementation = {
            CreateOrder: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await orderService.createOrder(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error)});
                }
            },
            UpdateStatusOrder: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await orderService.updateStatusOrder(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error)});
                }
            },
            GetOrderProduct: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const orderId = call.request.orderId;
                    const response = await orderService.getOrderProduct(orderId);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error)});
                }
            },
            GetOrderProducts: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await orderService.getOrderProducts();
                    callback(null, { data: response }); 
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },
        };

        const server = new grpc.Server();

        // Agregar servicio al servidor
        if (orderProto && orderProto.order && orderProto.order.OrderService) {
            server.addService(orderProto.order.OrderService.service, serviceImplementation);

            // Configurar el puerto del servidor
            const port = process.env.ORDER_SERVICE_URL || '0.0.0.0:50052';

            server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
                if (error) {
                    console.error('Error al iniciar el servidor gRPC:', error);
                    return;
                }
                console.log(`Servidor gRPC de OrderService corriendo en ${boundPort}`);
            });
        } else {
            throw new Error('OrderService no encontrado en la definición del proto.');
        }
    } catch (error) {
        console.error('Error en el servidor gRPC:', error);
    }
}
