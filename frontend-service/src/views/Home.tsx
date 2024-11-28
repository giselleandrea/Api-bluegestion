import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const getToken = () => localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchHome = async () => {
        const token = getToken();
        if (!token) {
            alert('Error: Token no encontrado');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('/home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Datos recibidos:', data);
            } else if (response.status === 401) {
                alert('Acceso no autorizado');
                navigate('/login');
            } else {
                throw new Error('Error al cargar la página de inicio');
            }
        } catch (error) {
            console.error('Error al cargar la página de inicio:', error);
        }
    };

    useEffect(() => {
        fetchHome();
    }, []);

    return (
        <div className="contenido">
            {/* Encabezado */}
            <div className="encabezado">
                <h1 className="titulo">BlueGestion</h1>
                <button className="boton-volver" onClick={logout}>
                    Cerrar Sesión
                </button>
            </div>

            {/* Botones principales */}
            <div className="fila-botones">
                <div className="grupo-botones">
                    <p>Crea usuarios para la gestión de órdenes</p>
                    <button
                        className="boton boton-azul"
                        onClick={() => navigate('/register')}
                    >
                        Crear Usuario
                    </button>
                </div>
                <div className="grupo-botones">
                    <p>Añade las sucursales para distribución</p>
                    <button
                        className="boton boton-verde"
                        onClick={() => navigate('/branch')}
                    >
                        Crear Sucursal
                    </button>
                </div>
                <div className="grupo-botones">
                    <p>Añade la información de los clientes con sucursales</p>
                    <button
                        className="boton boton-azul"
                        onClick={() => navigate('/customer')}
                    >
                        Crear Cliente
                    </button>
                </div>
            </div>

            {/* Botones secundarios */}
            <div className="fila-botones">
                <div className="grupo-botones">
                    <p>Administrar productos</p>
                    <button
                        className="boton boton-gris"
                        onClick={() => navigate('/product')}
                    >
                        Productos
                    </button>
                </div>
                <div className="grupo-botones">
                    <p>Administrar órdenes y pedidos</p>
                    <button
                        className="boton boton-azul"
                        onClick={() => navigate('/order')}
                    >
                        Órdenes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
