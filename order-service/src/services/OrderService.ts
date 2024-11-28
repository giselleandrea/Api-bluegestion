import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { Product } from '../../../product-service/src/entities/Product';

export class OrderService {
    // Crear una orden 
    async createOrder(data: any) {
        const { 
            referenceOrder, 
            totalAmount, 
            customerId, 
            productIds 
        } = data;

        // Verificar si el Order ya existe
        const existingOrder = await Order.findOne({ where: { referenceOrder } });

        if (existingOrder) {
            return { success: false, message: 'La orden ya está registrada' };
        }

        const newOrder = new Order();
        newOrder.referenceOrder = referenceOrder;
        newOrder.statusOrder = 'Recibida';
        newOrder.totalAmount = totalAmount;
        newOrder.customer = customerId;
        await newOrder.save();

        for (const { productId, cant } of productIds) {
            const product = await Product.findOne({ where: { id: productId } });

            if (!product) {
                return { success: false, message: `No se encontró el producto con el ID ${productId}` };
            }

            if (product.stock < cant) {
                return { success: false, message: `Stock insuficiente para el producto ${productId}` };
            }

            product.stock -= cant;
            await product.save();

            const newOrderProduct = new OrderProduct();
            newOrderProduct.order = newOrder;
            newOrderProduct.product = product;
            newOrderProduct.cant = cant;
            newOrderProduct.dateOrder = new Date();
            await newOrderProduct.save();
        }

        return newOrder.referenceOrder;
    }

    async updateStatusOrder(data: any) {
        const { 
            order_id, 
            statusOrder 
        } = data;

        const existingOrder = await Order.findOne({ where: { id: order_id } });

        if (!existingOrder) {
            return { success: false, message: 'La orden no existe' };
        }

        existingOrder.statusOrder = statusOrder;
        await existingOrder.save();

        return {
            success: true,
            message: 'Estado de la orden actualizado correctamente',
            data: statusOrder,
        }
    }

    async getOrderProduct(orderId: number) {
        const existingOrder = await Order.findOne({
            where: { id: orderId },
            relations: ['customer'],
        });

        if (!existingOrder) {
            return { success: false, message: 'La orden no existe' };
        }

        const findOrderProduct = await OrderProduct.find({
            where: { order: existingOrder },
            relations: ['product'],
        });

        return findOrderProduct;
    }

    async getOrderProducts() {
        const orders = await Order.find({
            relations: ["customer", "orderProducts", "orderProducts.product"],
        });
    
        if (!orders || orders.length === 0) {
            return { success: false, message: 'La orden no existe' };
        }
    
        const formattedOrders = orders.map((order) => ({
            order: {
                id: order.id,
                referenceOrder: order.referenceOrder,
                statusOrder: order.statusOrder,
                totalAmount: order.totalAmount,
                created_at: order.created_at,
                customer: {
                    id: order.customer.id,
                    nameCustomer: order.customer.nameCustomer,
                    phoneCustomer: order.customer.phoneCustomer,
                    neighborhoodCustomer: order.customer.neighborhoodCustomer,
                    address: order.customer.address,
                    email: order.customer.email,
                },
            },
            orderProducts: order.orderProducts.map((orderProduct) => ({
                id: orderProduct.id,
                cant: orderProduct.cant,
                dateOrder: orderProduct.dateOrder,
                product: {
                    id: orderProduct.product.id,
                    nameProduct: orderProduct.product.nameProduct,
                    referenceProduct: orderProduct.product.referenceProduct,
                    amountProduct: orderProduct.product.amountProduct,
                    description: orderProduct.product.description,
                    stock: orderProduct.product.stock,
                },
            })),
        }));

        console.log("formattedOrders: ", formattedOrders)
        return formattedOrders;
    }
    
}
