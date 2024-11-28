import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { createOrder, getOrders, updateStatusOrder } from '../api/orderService';
import { getProducts } from '../api/productService';
import { getCustomers } from '../api/customerService';

interface OrderProduct {
    id: number;
    productId: string;
    cant: number;
    dateOrder: string;
    product: {
        referenceProduct: string;
        nameProduct: string;
        description: string;
    };
}

interface Order {
    order: {
        id: number;
        referenceOrder: string;
        statusOrder: string;
        totalAmount: number;
        customerId: string;
        created_at: string;
    };
    orderProducts: OrderProduct[];
    customer?: {
        nameCustomer: string;
        email: string;
    };
}

const CreateOrder: React.FC = () => {
    const navigate = useNavigate();

    // Estados
    const [customers, setCustomers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [orderProducts, setOrderProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [referenceOrder, setReferenceOrder] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [customerId, setCustomerId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Obtener clientes
    useEffect(() => {
        getCustomers()
            .then((response) => {
                const customersData = response.data;
                if (Array.isArray(customersData)) {
                    setCustomers(customersData);
                } else {
                    console.error('Error: los datos de clientes no son un arreglo:', customersData);
                }
            })
            .catch((error) => console.error('Error al cargar los clientes:', error));
    }, []);

    // Obtener productos
    useEffect(() => {
        getProducts()
            .then((response) => {
                const productsData = response.data;
                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                } else {
                    console.error('Error: los datos de productos no son un arreglo:', productsData);
                }
            })
            .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    // Obtener órdenes
    useEffect(() => {
        getOrders()
            .then((response) => {
                const ordersData = response.data;
                console.log('Órdenes recibidas:', ordersData);

                if (Array.isArray(ordersData)) {
                    const validatedOrders = ordersData.map((order) => ({
                        ...order,
                        customer: order.customer || { nameCustomer: 'Cliente desconocido', email: 'N/A' },
                    }));
                    setOrders(validatedOrders);
                } else {
                    console.error('Error: los datos de órdenes no son un arreglo:', ordersData);
                }
            })
            .catch((error) => console.error('Error al cargar las órdenes:', error));
    }, []);

    // Manejar el cambio de estado de la orden
    const handleStatusChange = async (orderId: number, status: string) => {
        try {
            const response = await updateStatusOrder(orderId, status);

            if (response.success) {
                alert('Estado de la orden actualizado correctamente');
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order.id === orderId ? { ...order, order: { ...order.order, statusOrder: status } } : order
                    )
                );
            } else {
                alert('Error al actualizar el estado de la orden');
            }
        } catch (error) {
            console.error('Error al cambiar el estado:', error);
            alert('Error al cambiar el estado');
        }
    };

    // Filtrar las órdenes basadas en la búsqueda
    const filteredOrders = orders.filter((order) =>
        order.order?.referenceOrder?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Mostrar productos asociados a una orden
    const renderOrderProducts = (orderProducts: OrderProduct[]) => {
        return orderProducts.map((product, index) => (
            <div key={index} className="product-info">
                {product.product.nameProduct} (Cantidad: {product.cant})
            </div>
        ));
    };

    // Manejar la creación de una nueva orden
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            referenceOrder,
            totalAmount,
            customerId,
            productIds: orderProducts.map((p) => ({
                productId: p.productId,
                cant: p.cant,
            })),
        };

        try {
            await createOrder(payload);
            alert('Orden creada correctamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al crear la orden:', error);
            alert('Error al crear la orden.');
        }
    };

    // Añadir un producto a la orden
    const addProduct = () => {
        setOrderProducts([...orderProducts, { productId: '', cant: 1 }]);
    };

    // Actualizar los productos seleccionados
    const updateProduct = (index: number, field: string, value: string | number) => {
        const updatedProducts = [...orderProducts];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setOrderProducts(updatedProducts);
    };

    // Eliminar un producto de la orden
    const removeProduct = (index: number) => {
        const updatedProducts = orderProducts.filter((_, i) => i !== index);
        setOrderProducts(updatedProducts);
    };

    return (
        <div className="content">
            <h1>Crear Orden</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Referencia de la Orden"
                    value={referenceOrder}
                    onChange={(e) => setReferenceOrder(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Total a Pagar"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                />
                <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                    <option value="">Seleccione un cliente</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>                            
                            {customer.nameCustomer}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={addProduct}>
                    Añadir Producto
                </button>
                {orderProducts.map((orderProduct, index) => (
                    <div key={index}>
                        <select
                            value={orderProduct.productId}
                            onChange={(e) => updateProduct(index, 'productId', e.target.value)}
                        >
                            <option value="">Seleccione un producto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.nameProduct}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={orderProduct.cant}
                            onChange={(e) => updateProduct(index, 'cant', Number(e.target.value))}
                        />
                        <button type="button" onClick={() => removeProduct(index)}>
                            Eliminar
                        </button>
                    </div>
                ))}
                <button type="submit">Crear Orden</button>
            </form>

            <div className="container-product">
                <input
                    type="text"
                    placeholder="Buscar órdenes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <table id="orderTable">
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Estado</th>
                            <th>Valor total</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Fecha orden</th>
                            <th>Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((orderData) => {
                                const { order, orderProducts, customer } = orderData;

                                return (
                                    <React.Fragment key={order.id}>
                                        <tr>
                                            <td>{order.referenceOrder}</td>
                                            <td>
                                                <select
                                                    className="status-select"
                                                    value={order.statusOrder}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    {['Pendiente', 'Procesando', 'Completada', 'Cancelada', 'Recibida'].map(
                                                        (status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </td>
                                            <td>$ {order.totalAmount}</td>
                                            <td>{customer?.nameCustomer || 'Sin cliente asignado'}</td>
                                            <td>{customer?.email || 'N/A'}</td>
                                            <td>{new Date(order.created_at).toLocaleString()}</td>
                                            <td>{renderOrderProducts(orderProducts)}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7}>No se encontraron órdenes.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateOrder;
