import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Sidebar from './components/Sidebar';
import PlanList from './components/PlanList';
import PlanForm from './components/PlanForm'; // PlanForm bileşenini içe aktarın
import api from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
      fetchEmployees();
      fetchPlans();
  }, []);

  const fetchEmployees = async () => {
      try {
          const response = await api.get('/employees');
          setEmployees(response.data);
      } catch (error) {
          toast.error('Failed to fetch employees');
      }
  };

  const fetchPlans = async () => {
      try {
          const response = await api.get('/plans');
          setPlans(response.data);
      } catch (error) {
          toast.error('Failed to fetch plans');
      }
  };

  const handleEditEmployee = (employee) => {
      setSelectedEmployee(employee);
  };

  const handleEditPlan = (plan) => {
      setSelectedPlan(plan);
  };

  const handleDeleteEmployee = async (id) => {
      try {
          await api.delete(`/employees/${id}`);
          toast.success('Employee deleted successfully');
          fetchEmployees();
      } catch (error) {
          toast.error('Failed to delete employee');
      }
  };

  const handleDeletePlan = async (id) => {
      try {
          await api.delete(`/plans/${id}`);
          toast.success('Plan deleted successfully');
          fetchPlans();
      } catch (error) {
          toast.error('Failed to delete plan');
      }
  };

  const handleSaveEmployee = () => {
      fetchEmployees();
      setSelectedEmployee(null);
  };

  const handleSavePlan = () => {
      fetchPlans();
      setSelectedPlan(null);
  };

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <Router>
          <div>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                  <ToastContainer />
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route 
                          path="/employees" 
                          element={
                              <>
                                  <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSaveEmployee} />
                                  <EmployeeList employees={employees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
                              </>
                          } 
                      />
                      <Route 
                          path="/plans" 
                          element={
                              <>
                                  <PlanForm selectedEmployee={selectedEmployee} selectedPlan={selectedPlan} onSave={handleSavePlan} />
                                  <PlanList plans={plans} onEdit={handleEditPlan} onDelete={handleDeletePlan} />
                              </>
                          } 
                      />
                      <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
};

export default App;
