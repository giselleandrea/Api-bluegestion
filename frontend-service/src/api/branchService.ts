import axiosInstance from './axiosInstance';

export const createBranch = async (branchData: any, token: string | null) => {
    try {
        const response = await axiosInstance.post(`/api/branch`, branchData, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBranchById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/branch/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener la sucursal:', error);
        throw new Error(`Error al obtener la sucursal con ID ${id}`);
    }
};


export const getBranches = async () => {
    try {
        const response = await axiosInstance.get(`/api/branches`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};


