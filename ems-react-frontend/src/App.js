import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import api from './api';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus, FaUserEdit, FaUserMinus, FaUsersCog } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


const App = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await api.get('/employees');
        setEmployees(response.data);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleDelete = async (id) => {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
        toast.success('Employee deleted successfully!');
    };

    const handleSave = () => {
        setSelectedEmployee(null);
        fetchEmployees();
    };

    return (
      <Container fluid>
            <ToastContainer />
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <div className="sidebar">
                        <h3 className="text-center">Admin Panel</h3>
                        <button className="btn btn-success mb-2 w-100" onClick={() => setSelectedEmployee(null)}>
                            <FaUserPlus /> Add Employee
                        </button>
                        <button className="btn btn-info mb-2 w-100">
                            <FaUserEdit /> Update Employee
                        </button>
                        <button className="btn btn-danger mb-2 w-100">
                            <FaUserMinus /> Delete Employee
                        </button>
                        <button className="btn btn-warning mb-2 w-100">
                            <FaUsersCog /> Manage Users
                        </button>
                    </div>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <h1 className="text-center mt-4">Employee Management System</h1>
                    <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSave} />
                    <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
                </Col>
            </Row>
        </Container>
        
    );
};

export default App;
