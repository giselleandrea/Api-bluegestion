import express, { Request, Response } from 'express';
import customerClient from '../grpc-clients/customer.client';

const router = express.Router();

// Crear un customer
router.post('/customer', (req: Request, res: Response) => {
    customerClient.CreateCustomer(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en CreateCustomer:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(response);
        }
    });
});

// Obtener un customer por ID
router.get('/customer/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    customerClient.GetCustomer({ customer_id: parseInt(id) }, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetCustomer:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener todos los customer
router.get('/customers', (_req: Request, res: Response) => {
    customerClient.GetCustomers({}, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetCustomers:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

export default router;