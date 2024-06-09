package com.emrah.ems_demo.repo;


import com.emrah.ems_demo.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByEmployeeId(Long employeeId);
}
