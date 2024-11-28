import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

export class AuthService {
    async createUser(data: any) {
        const { name, email, password, document, typeDocument, typeUserId } = data;
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Crear un nuevo usuario
        const newUser = new User();
        newUser.name = name;
        newUser.password = hashedPassword;
        newUser.document = document;
        newUser.email = email;
        newUser.typeDocument = typeDocument;
        newUser.typeUser = typeUserId;
    
        await newUser.save();
    
        return { message: 'Usuario creado correctamente' };
    }
    
    async login(data: any) {
        const { email, password } = data;
    
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Usuario no encontrado');
    
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Contraseña incorrecta');
    
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '3h' });
    
        return { token };
    }
}