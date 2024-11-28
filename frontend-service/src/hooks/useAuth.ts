export const useAuth = () => {
    // Función para obtener el token de localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };
    // Función para verificar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!getToken();
    };
    return { getToken, isAuthenticated };
};