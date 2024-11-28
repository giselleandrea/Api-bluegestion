import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';

import path from 'path';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import customerRoutes from './routes/customer.routes';
import branchRoutes from './routes/branch.routes';
import productRoutes from './routes/product.routes';

import servicesConfig from './config/servicesConfig';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true, 
}));

app.use('/api', authRoutes);
app.use('/api', productRoutes)
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);
app.use('/api', branchRoutes);

app.use('/branch', proxy(servicesConfig.branch));
app.use('/auth', proxy(servicesConfig.auth));
app.use('/customer', proxy(servicesConfig.customer));
app.use('/product', proxy(servicesConfig.product));
app.use('/order', proxy(servicesConfig.order));


const PORT = process.env.API_GATEWAY_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
