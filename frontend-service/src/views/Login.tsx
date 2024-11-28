import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; 
import { login } from '../api/loginService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Llamar al servicio de login con email y contraseña
            const response = await login({ email, password });
            
            // Guardar el token en localStorage si la respuesta es exitosa
            if (response && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');  // Redirigir a la página principal o a donde desees
            } else {
                alert('No se pudo obtener el token');
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="content">
            <header>
                <h1>BlueGestion</h1>
            </header>

            <div className="header-section">
                <h2>INICIAR SESIÓN</h2>
                <button className="back-button" onClick={() => navigate('/home')}>
                    Regresar
                </button>
            </div>

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <input type="submit" value="Iniciar sesión" />
            </form>
        </div>        
    );
};

export default Login;