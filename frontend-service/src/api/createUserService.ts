import axiosInstance from './axiosInstance';

export const createUser = async (data: any) => {
    try {
        const response = await axiosInstance.post('/api/register', data);
        return response;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error; 
    }
};