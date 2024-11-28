import express, { Request, Response } from 'express';
import productClient from '../grpc-clients/product.client';

const router = express.Router();

// Crear un producto
router.post('/product', (req: Request, res: Response) => {
    productClient.CreateProduct(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en CreateProduct:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(response);
        }
    });
});

// Actualizar un producto
router.put('/product', (req: Request, res: Response) => {
    productClient.UpdateProduct(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en UpdateProduct:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener un producto por ID
router.get('/product/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    productClient.GetProduct({ productId: parseInt(id) }, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetProduct:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener todos los productos
router.get('/products', (_req: Request, res: Response) => {
    productClient.GetProducts({}, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetProducts:', error);
            res.status(500).json({ error: error.message });
        } else {
            if (response.data && response.data.length > 0) {
                res.status(200).json({
                    success: true,
                    data: response.data || [] 
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: response.message || 'No se encontraron productos',
                    data: []
                });
            }
        }        
    });
});

// Obtener todas las categorías
router.get('/categories', (_req: Request, res: Response) => {
    productClient.GetCategories({}, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetCategories:', error);
            res.status(500).json({ error: error.message });
        } else {
            if (response.success) {
                res.status(200).json({
                    success: true,
                    message: response.message,
                    data: response.data || [] 
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: response.message || 'No se encontraron productos',
                    data: []
                });
            }
        }
    });
});


export default router;
