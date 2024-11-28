import express, { Request, Response } from 'express';
import orderClient from '../grpc-clients/order.client';

const router = express.Router();

// Crear una orden 
router.post('/order', (req: Request, res: Response) => {
    orderClient.CreateOrder(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en CreateOrder:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(response);
        }
    });
});

// Actualizar estado de una orden
router.put('/order', (req: Request, res: Response) => {
    orderClient.UpdateStatusOrder(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en UpdateStatusOrder:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener una orden por ID
router.get('/order/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    orderClient.GetOrderProduct({ productId: parseInt(id) }, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetOrderProduct:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener todas las órdenes
router.get('/orders', (_req: Request, res: Response) => {
    orderClient.GetOrderProducts({}, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetOrderProducts:', error);
            res.status(500).json({ 
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        } else {
            if (response.data && response.data.length > 0) {
                res.status(200).json({
                    success: true,
                    message: response.message || 'Órdenes encontradas',
                    data: response.data,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: response.message || 'No se encontraron órdenes',
                    data: [],
                });
            }
        }
    });
});

export default router;