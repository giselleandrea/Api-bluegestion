import express, { Request, Response } from 'express';
import branchClient from '../grpc-clients/branch.client';

const router = express.Router();

// Crear un branch
router.post('/branch', (req: Request, res: Response) => {
    branchClient.CreateBranch(req.body, (error: any, response: any) => {
        if (error) {
            console.error('Error en Createbranch:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(201).json(response);
        }
    });
});

// Obtener un branch por ID
router.get('/branch/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    branchClient.GetBranch({ branchId: parseInt(id) }, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetBranch:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
});

// Obtener todos los branch
router.get('/branches', (_req: Request, res: Response) => {
    branchClient.GetBranches({}, (error: any, response: any) => {
        if (error) {
            console.error('Error en GetBranches:', error);
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
                    message: response.message || 'No se encontraron sucursales',
                    data: []
                });
            }
        }
    });
});


export default router;