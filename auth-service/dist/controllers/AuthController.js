"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
const createUser = async (req, res) => {
    try {
        const { name, email, password, document, typeDocument, typeUserId } = req.body;
        const response = await authService.createUser({ name, email, password, document, typeDocument, typeUserId });
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.createUser = createUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authService.login({ email, password });
        res.json(response);
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};
exports.login = login;
exports.default = {
    createUser: exports.createUser,
    login: exports.login,
};
