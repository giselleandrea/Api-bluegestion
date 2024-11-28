import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { createCustomer } from '../api/customerService';
import { getBranches } from '../api/branchService';

const CreateCustomer: React.FC = () => {
    const [branches, setBranches] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        nameCustomer: '',
        phoneCustomer: '',
        neighborhoodCustomer: '',
        address: '',
        email: '',
        branchId: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fetch branches when component mounts
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const branchData = await getBranches();
                setBranches(branchData);
            } catch (error) {
                console.error('Error al obtener las sucursales:', error);
                alert('Error al cargar las sucursales. Por favor, inténtalo de nuevo.');
            }
        };

        fetchBranches();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createCustomer(formData);

            if (response.success) {
                alert('Cliente creado con éxito');
                navigate('/home');
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage('Error al crear el cliente. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="content">
            <div className="header-section">
                <h1 className="title">BlueGestion</h1>
                <button className="back-button" onClick={() => navigate('/home')}>Regresar</button>
            </div>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor="nameCustomer">Nombre:</label>
                    <input
                        type="text"
                        id="nameCustomer"
                        name="nameCustomer"
                        value={formData.nameCustomer}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="phoneCustomer">Teléfono:</label>
                    <input
                        type="text"
                        id="phoneCustomer"
                        name="phoneCustomer"
                        value={formData.phoneCustomer}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="neighborhoodCustomer">Barrio:</label>
                    <input
                        type="text"
                        id="neighborhoodCustomer"
                        name="neighborhoodCustomer"
                        value={formData.neighborhoodCustomer}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="branchId">Sucursal:</label>
                    <select
                        id="branchId"
                        name="branchId"
                        value={formData.branchId}
                        onChange={handleInputChange}
                        required
                    >
                    <option value="">Seleccione una sucursal</option>
                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                        {branch.nameBranch}
                        </option>
                    ))}
                    </select>

                    <input type="submit" value="Crear Cliente" className="submit-button" />
                </form>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default CreateCustomer;
