import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { 
    createProduct, 
    getProducts,
    getCategories  
} from '../api/productService';

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        nameProduct: '',
        referenceProduct: '',
        amountProduct: 0,
        stock: 0,
        description: '',
        categoryId: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const productResponse = await getProducts();
                setProducts(productResponse.data);

                const categoryResponse = await getCategories();
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error('Error al cargar los datos iniciales:', error);
            }
        };
        fetchInitialData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            alert('Producto creado con éxito');
            setFormData({
                nameProduct: '',
                referenceProduct: '',
                amountProduct: 0,
                stock: 0,
                description: '',
                categoryId: '',
            });
            const updatedProducts = await getProducts();
            setProducts(updatedProducts.data);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto. Por favor, inténtelo de nuevo.');
        }
    };

    const filteredProducts = products.filter(
        (product) =>
            product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.referenceProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="content">
            <header>
                <h1>BlueGestion</h1>
            </header>

            <div className="header-section">
                <h2>PRODUCTOS</h2>
                <button className="back-button" onClick={() => navigate('/home')}>Regresar</button>
            </div>

            <div className="container">
                <div>
                    <div className="search-container">
                        <label htmlFor="searchInput">Buscar:</label>
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Buscar por Producto o Referencia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <table id="productTable" className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Referencia</th>
                                <th>Precio unitario</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nameProduct}</td>
                                    <td>{product.referenceProduct}</td>
                                    <td>{product.amountProduct}</td>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <form id="productForm" className="form-section" onSubmit={handleSubmit}>
                    <label htmlFor="nameProduct">Nombre:</label>
                    <input
                        type="text"
                        id="nameProduct"
                        name="nameProduct"
                        value={formData.nameProduct}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="referenceProduct">Referencia:</label>
                    <input
                        type="text"
                        id="referenceProduct"
                        name="referenceProduct"
                        value={formData.referenceProduct}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="amountProduct">Precio unitario:</label>
                    <input
                        type="number"
                        id="amountProduct"
                        name="amountProduct"
                        value={formData.amountProduct}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="stock">Cantidad en stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        cols={50}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>

                    <label htmlFor="categoryId">Categoría:</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="submit-button">Crear Producto</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
