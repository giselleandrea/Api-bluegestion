import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import CreateBranch from './views/CreateBranch';
import CreateUser from './views/CreateUser';
import Login from './views/Login';
import CreateCustomer from './views/CreateCustomer';
import CreateProduct from './views/Createproduct';
import CreateOrder from './views/CreateOrder';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/branch" element={<CreateBranch />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer" element={<CreateCustomer />} />
            <Route path="/product" element={<CreateProduct />} />
            <Route path="/order" element={<CreateOrder  />} />
        </Routes>
    </Router>
);

export default AppRoutes;

