import axiosInstance from './axiosInstance';

// Crear un producto
export const createProduct = async (data: any) => {
    try {
        const response = await axiosInstance.post('/api/product', data);
        return response.data; 
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw new Error('Error al crear el producto');
    }
};

// Actualizar un producto
export const updateProduct = async (data: any) => {
    try {
        const response = await axiosInstance.put('/api/product', data);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw new Error('Error al actualizar el producto');
    }
};

// Obtener un producto por ID
export const getProductById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/api/product/${id}`);
        return response.data; // Retorna la información del producto
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw new Error('Error al obtener el producto');
    }
};

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/api/products');
        return response.data; // Retorna el listado de productos
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw new Error('Error al obtener los productos');
    }
};

// Obtener todas las categorías
export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/api/categories');
        return response.data; // Retorna el listado de categorías
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw new Error('Error al obtener las categorías');
    }
};


