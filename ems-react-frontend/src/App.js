import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import PlanForm from './components/PlanForm';
import PlanList from './components/PlanList';
import Sidebar from './components/Sidebar';
import api from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await api.get('/employees');
        setEmployees(response.data);
    };

    const fetchPlans = async (employeeId) => {
        const response = await api.get(`/plans/employee/${employeeId}`);
        setPlans(response.data);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        fetchPlans(employee.id);
    };

    const handleDeleteEmployee = async (id) => {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
        toast.success('Employee deleted successfully!');
    };

    const handleSaveEmployee = () => {
        setSelectedEmployee(null);
        fetchEmployees();
    };

    const handleEditPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleDeletePlan = async (id) => {
        await api.delete(`/plans/${id}`);
        fetchPlans(selectedEmployee.id);
        toast.success('Plan deleted successfully!');
    };

    const handleSavePlan = () => {
        setSelectedPlan(null);
        fetchPlans(selectedEmployee.id);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Container fluid>
            <ToastContainer />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Row className="offset-md-3">
                <Col xs={12} id="page-content-wrapper">
                    <h1 className="text-center mt-4">Employee Management System</h1>
                    <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSaveEmployee} />
                    <EmployeeList employees={employees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
                    {selectedEmployee && (
                        <>
                            <h2 className="text-center mt-4">Plans for {selectedEmployee.name}</h2>
                            <PlanForm selectedEmployee={selectedEmployee} selectedPlan={selectedPlan} onSave={handleSavePlan} />
                            <PlanList plans={plans} onEdit={handleEditPlan} onDelete={handleDeletePlan} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default App;
