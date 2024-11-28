import { Router } from 'express';
import authClient from '../grpc-clients/auth.client';

const router = Router();

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    authClient.Login({ email, password }, (err: any, response: any) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json(response);
    });
});

// Crear Usuario
router.post('/register', (req, res) => {
    const { name, 
            email,
            password, 
            document,
            typeDocument,
            typeUserId } = req.body;
    
    authClient.CreateUser(
        { 
            name, 
            email, 
            password, 
            document, 
            typeDocument, 
            typeUserId 
        }, (err: any, response: any) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(response);
        }
    );
});

export default router;
