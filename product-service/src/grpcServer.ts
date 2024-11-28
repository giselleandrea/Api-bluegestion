import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import dotenv from 'dotenv';
import { ProductService } from './services/ProductService';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const PROTO_PATH = path.join(__dirname, './grpc/product.proto');

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
        const productProto = grpc.loadPackageDefinition(packageDefinition) as any;
        // Instancia del servicio de productos
        const productService = new ProductService();

        // Implementación del servicio gRPC
        const serviceImplementation = {
            CreateProduct: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await productService.createProduct(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },
            UpdateProduct: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await productService.updateProduct(call.request);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.INTERNAL, message: String(error) });
                }
            },
            GetProduct: async (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const productId = call.request.productId;
                    const response = await productService.getProduct(productId);
                    callback(null, response);
                } catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: String(error) });
                }
            },
            GetProducts: async (_call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await productService.getProducts();
                    callback(null, { success: response.success, message: response.message, data: response.data });
                } catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: String(error) });
                }
            },
            GetCategories: async (_call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
                try {
                    const response = await productService.getCategories();
                    callback(null, { success: response.success, message: response.message, data: response.data });
                } catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: String(error) });
                }
            },
        };

        const server = new grpc.Server();

        // Agregar servicio al servidor
        if (productProto && productProto.product && productProto.product.ProductService) {
            server.addService(productProto.product.ProductService.service, serviceImplementation);

            // Configurar el puerto del servidor
            const port = process.env.PRODUCT_SERVICE_URL || '0.0.0.0:50053';

            server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
                if (error) {
                    console.error('Error al iniciar el servidor gRPC:', error);
                    return;
                }
                console.log(`Servidor gRPC de ProductService corriendo en ${boundPort}`);
            });
        } else {
            throw new Error('ProductService no encontrado en la definición del proto.');
        }
    } catch (error) {
        console.error('Error en el servidor gRPC:', error);
    }
}
