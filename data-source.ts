import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import path from "path";
import { User } from "./auth-service/src/entities/User";
import { TypeUser } from "./auth-service/src/entities/TypeUser";
import { Product } from "./product-service/src/entities/Product";
import { Category } from "./product-service/src/entities/Category";
import { Order } from "./order-service/src/entities/Order";
import { OrderProduct } from "./order-service/src/entities/OrderProduct";
import { Branch } from "./branch-service/src/entities/Branch";
import { Customer } from "./customer-service/src/entities/Customer";

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        TypeUser,
        Product,
        Category,
        Order,
        OrderProduct,
        Customer,
        Branch
    ], 
    migrations: [],
    subscribers: [],
});

export default AppDataSource;