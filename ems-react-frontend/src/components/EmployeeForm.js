import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const EmployeeForm = ({ selectedEmployee, onSave }) => {
    const [employee, setEmployee] = useState({ name: '', position: '', department: ''});

    useEffect(() => {
        if (selectedEmployee) {
            setEmployee(selectedEmployee);
        } else {
            setEmployee({name: '', position: '', department: '' });
        }
    }, [selectedEmployee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (employee.id) {
            await api.put(`/employees/${employee.id}`, employee);
            toast.success('Employee updated successfully!');
        } else {
            await api.post('/employees', employee);
            toast.success('Employee added successfully!');
        }
        onSave();
        setEmployee({ name: '', position: '', department: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input name="name" value={employee.name} onChange={handleChange} className="form-control" placeholder="Name" />
                </div>
                <div className="form-group col-md-6">
                    <input name="position" value={employee.position} onChange={handleChange} className="form-control" placeholder="Postion" />
                </div>
                <div className="form-group col-md-6">
                    <input name="department" value={employee.department} onChange={handleChange} className="form-control" placeholder="Department" />
                </div>
            </div>
           
       
            <button type="submit" className="btn btn-primary">{employee.id ? 'Update' : 'Add'} Employee</button>
        </form>
    );
};

export default EmployeeForm;
