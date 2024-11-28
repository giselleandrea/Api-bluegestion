import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; 
import { createUser } from '../api/createUserService';

const CreateUser: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        document: '',
        typeDocument: '',
        typeUserId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createUser(formData);
            const data = await response.data;

            if (response.status === 200) {
                alert(data.message || 'Usuario creado exitosamente.');
                navigate('/home');
            } else {
                alert(data.error || 'Error al crear el usuario. Por favor, inténtalo de nuevo.');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.response?.data?.error || 'Error al crear el usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="contenido create-user-page">
            <header className="encabezado">
                <h1 className="titulo">BlueGestion</h1>
            </header>

            <div className="header-section">
                <h2>Crear Usuario</h2>
                <div className="button-group">
                    <button className="boton-volver" onClick={() => navigate(-1)}>
                        Regresar
                    </button>
                    <button className="boton-volver" onClick={() => navigate('/home')}>
                        Ir a Inicio
                    </button>
                </div>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="typeDocument">Tipo de Documento:</label>
                        <select
                            id="typeDocument"
                            name="typeDocument"
                            value={formData.typeDocument}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="CC">CC</option>
                            <option value="NIT">NIT</option>
                        </select>

                        <label htmlFor="document">Documento:</label>
                        <input
                            type="text"
                            id="document"
                            name="document"
                            value={formData.document}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="typeUserId">Tipo de Usuario:</label>
                        <select
                            id="typeUserId"
                            name="typeUserId"
                            value={formData.typeUserId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="1">Admin</option>
                            <option value="2">Vendedor</option>
                        </select>
                    </div>
                    <button type="submit" className="boton">
                        Crear Usuario
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
