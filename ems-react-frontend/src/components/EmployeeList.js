import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sl.NO</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>position</th>
                        <th>department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2" onClick={() => onEdit(employee)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
