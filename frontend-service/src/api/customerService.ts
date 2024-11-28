import axiosInstance from './axiosInstance';

export const createCustomer = async (data: any) => {
    try {
        const response = await axiosInstance.post('/api/customer', data);
        return response.data; 
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw new Error('Error al crear el cliente');
    }
};

export const getCustomers = async () => {
    try {
        const response = await axiosInstance.get('/api/customers');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw new Error('Error al obtener los clientes');
    }
};



