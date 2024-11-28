import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/styles.css';
import { createBranch, getBranches } from '../api/branchService';

const CreateBranch: React.FC = () => {
    const { getToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [nameBranch, setNameBranch] = useState('');
    const [phoneBranch, setPhoneBranch] = useState('');
    const [neighborhoodBranch, setNeighborhoodBranch] = useState('');
    const [address, setAddress] = useState('');
    const [nameContact, setNameContact] = useState('');
    const [branches, setBranches] = useState<any[]>([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const branchData = {
            nameBranch,
            phoneBranch,
            neighborhoodBranch,
            address,
            nameContact,
        };

        try {
            const token = getToken();
            const response = await createBranch(branchData, token);

            if (response) {
                alert('Sucursal creada con éxito');
                setNameBranch('');
                setPhoneBranch('');
                setNeighborhoodBranch('');
                setAddress('');
                setNameContact('');
                fetchBranches();
            }
        } catch (error) {
            console.error('Error al crear sucursal:', error);
            alert('Error al crear la sucursal. Por favor, inténtalo de nuevo.');
        }
    };

    const fetchBranches = async () => {
        try {
            const data = await getBranches();
            setBranches(data);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    return (
        <div className="contenido">
            <header className="encabezado">
                <h1 className="titulo">BlueGestion</h1>
            </header>

            <div className="header-section">
                <h2>Crear Sucursal</h2>
            </div>

            <div className="table-container">
                {/* Tabla de sucursales */}
                <table className="tabla-sucursales">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sucursal</th>
                            <th>Teléfono</th>
                            <th>Barrio</th>
                            <th>Dirección</th>
                            <th>Nombre de Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map((branch) => (
                            <tr key={branch.id}>
                                <td>{branch.id}</td>
                                <td>{branch.nameBranch}</td>
                                <td>{branch.phoneBranch}</td>
                                <td>{branch.neighborhoodBranch}</td>
                                <td>{branch.address}</td>
                                <td>{branch.nameContact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                <h2 className="text-center">Crear Nueva Sucursal</h2>
                <form onSubmit={handleSubmit} className="form-section">
                    <label htmlFor="nameBranch">Nombre de la Sucursal:</label>
                    <input
                        type="text"
                        id="nameBranch"
                        value={nameBranch}
                        onChange={(e) => setNameBranch(e.target.value)}
                        required
                    />

                    <label htmlFor="phoneBranch">Teléfono:</label>
                    <input
                        type="text"
                        id="phoneBranch"
                        value={phoneBranch}
                        onChange={(e) => setPhoneBranch(e.target.value)}
                        required
                    />

                    <label htmlFor="neighborhoodBranch">Barrio:</label>
                    <input
                        type="text"
                        id="neighborhoodBranch"
                        value={neighborhoodBranch}
                        onChange={(e) => setNeighborhoodBranch(e.target.value)}
                        required
                    />

                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />

                    <label htmlFor="nameContact">Nombre de Contacto:</label>
                    <input
                        type="text"
                        id="nameContact"
                        value={nameContact}
                        onChange={(e) => setNameContact(e.target.value)}
                        required
                    />

                    <button type="submit" className="boton">
                        Crear Sucursal
                    </button>
                </form>
            </div>

            <div className="button-row">
                <a href="/home">
                    <button className="boton-volver">Regresar</button>
                </a>
            </div>
        </div>
    );
};

export default CreateBranch;
