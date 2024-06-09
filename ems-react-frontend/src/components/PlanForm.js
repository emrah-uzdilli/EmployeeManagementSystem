import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const PlanForm = ({ selectedEmployee, selectedPlan, onSave }) => {
    const [plan, setPlan] = useState({ location: '', startTime: '', endTime: '', hourlyRate: '' });

    useEffect(() => {
        if (selectedPlan) {
            setPlan(selectedPlan);
        } else {
            setPlan({ location: '', startTime: '', endTime: '', hourlyRate: '' });
        }
    }, [selectedPlan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPlan) {
            await api.put(`/plans/${selectedPlan.id}`, { ...plan, employee: selectedEmployee });
            toast.success('Plan updated successfully!');
        } else {
            await api.post('/plans', { ...plan, employee: selectedEmployee });
            toast.success('Plan added successfully!');
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input name="location" value={plan.location} onChange={handleChange} className="form-control" placeholder="Location" />
                </div>
                <div className="form-group col-md-6">
                    <input type="datetime-local" name="startTime" value={plan.startTime} onChange={handleChange} className="form-control" placeholder="Start Time" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="datetime-local" name="endTime" value={plan.endTime} onChange={handleChange} className="form-control" placeholder="End Time" />
                </div>
                <div className="form-group col-md-6">
                    <input type="number" name="hourlyRate" value={plan.hourlyRate} onChange={handleChange} className="form-control" placeholder="Hourly Rate" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">{selectedPlan ? 'Update' : 'Add'} Plan</button>
        </form>
    );
};

export default PlanForm;
