import axiosInstance from './axiosInstance';

export const login = async (data: { email: string, password: string }) => {
    try {
        const response = await axiosInstance.post('/api/login', data);
        return response;
    } catch (error) {
        console.error('Error al hacer login:', error);
        throw error; 
    }
};