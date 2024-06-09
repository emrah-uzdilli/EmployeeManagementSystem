import React from 'react';

const PlanList = ({ plans, onEdit, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Hourly Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan.id}>
                            <td>{plan.location}</td>
                            <td>{new Date(plan.startTime).toLocaleString()}</td>
                            <td>{new Date(plan.endTime).toLocaleString()}</td>
                            <td>{plan.hourlyRate}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2" onClick={() => onEdit(plan)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(plan.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanList;
