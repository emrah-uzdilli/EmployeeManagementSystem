package com.emrah.ems_demo.service;


import com.emrah.ems_demo.model.Employee;
import com.emrah.ems_demo.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Create operation
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Read operation - get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Read operation - get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Update operation
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setName(employeeDetails.getName());
            employee.setPosition(employeeDetails.getPosition());
            employee.setDepartment(employeeDetails.getDepartment());
            return employeeRepository.save(employee);
        }).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
    }

    // Delete operation
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
