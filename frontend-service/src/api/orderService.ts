import axiosInstance from './axiosInstance';

// Crear una orden
export const createOrder = async (orderData: any) => {
    try {
        const response = await axiosInstance.post('/api/order', orderData);
        return response.data;
    } catch (error) {
        console.error('Error en createOrder:', error);
        throw error;
    }
};

// Actualizar el estado de una orden
export const updateStatusOrder = async (orderId: number, statusOrder: string) => {
    try {
        const response = await axiosInstance.put('/api/order', { order_id: orderId, statusOrder });
        return response.data;
    } catch (error) {
        console.error('Error en updateOrderStatus:', error);
        throw error;
    }
};

// Obtener una orden por ID
export const getOrderById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/api/order/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error en getOrderById:', error);
        throw error;
    }
};

// Obtener todas las ordenes
export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/api/orders');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las ordenes:', error);
        throw new Error('Error al obtener las ordenes');
    }
};

