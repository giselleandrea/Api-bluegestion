"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const grpc_js_1 = __importDefault(require("@grpc/grpc-js"));
const proto_loader_1 = __importDefault(require("@grpc/proto-loader"));
const AuthService_1 = require("./services/AuthService");
dotenv_1.default.config();
const PROTO_PATH = __dirname + '/grpc/auth.proto';
const PORT = process.env.AUTH_SERVICE_PORT || 50051;
const authService = new AuthService_1.AuthService();
const packageDefinition = proto_loader_1.default.loadSync(PROTO_PATH, {});
const protoDescriptor = grpc_js_1.default.loadPackageDefinition(packageDefinition);
const authProto = protoDescriptor.auth;
function login(call, callback) {
    const { email, password } = call.request;
    authService.login({ email, password })
        .then(response => callback(null, response))
        .catch(error => callback(error, null));
}
function createUser(call, callback) {
    const { name, email, password, document, typeDocument, typeUserId } = call.request;
    authService.createUser({ name, email, password, document, typeDocument, typeUserId })
        .then(response => callback(null, response))
        .catch(error => callback(error, null));
}
function main() {
    const server = new grpc_js_1.default.Server();
    server.addService(authProto.AuthService.service, {
        login: authService.login,
        createUser: authService.createUser,
    });
    server.bindAsync(`0.0.0.0:${PORT}`, grpc_js_1.default.ServerCredentials.createInsecure(), (error, PORT) => {
        if (error) {
            console.error('Error al iniciar el servidor:', error);
            return;
        }
        console.log(`Auth Service gRPC server running at http://0.0.0.0:${PORT}`);
    });
}
main();
