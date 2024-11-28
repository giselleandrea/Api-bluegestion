import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

export const servicesConfig = {
    authService: process.env.AUTH_SERVICE_URL || 'http://localhost:50051', 
    orderService: process.env.ORDER_SERVICE_URL || 'http://localhost:50052',
    productService: process.env.PRODUCT_SERVICE_URL || 'http://localhost:50053',
    customerService: process.env.CUSTOMER_SERVICE_URL || 'http://localhost:50054',
    branchService: process.env.BRANCH_SERVICE_URL || 'http://localhost:50055',
};

export default {
    branch: 'http://localhost:5001',
    customer: 'http://localhost:5002',
    auth: 'http://localhost:5003',
    order: 'http://localhost:5004',
    product: 'http://localhost:5005',
};