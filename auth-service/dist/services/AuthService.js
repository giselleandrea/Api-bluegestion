"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async createUser(data) {
        const { name, email, password, document, typeDocument, typeUserId } = data;
        // Encriptar la contraseña
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Crear un nuevo usuario
        const newUser = new User_1.User();
        newUser.name = name;
        newUser.password = hashedPassword;
        newUser.document = document;
        newUser.email = email;
        newUser.typeDocument = typeDocument;
        newUser.typeUser = typeUserId;
        await newUser.save();
        return { message: 'Usuario creado correctamente' };
    }
    async login(data) {
        const { email, password } = data;
        const user = await User_1.User.findOne({ where: { email } });
        if (!user)
            throw new Error('Usuario no encontrado');
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword)
            throw new Error('Contraseña incorrecta');
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return { token };
    }
}
exports.AuthService = AuthService;
