package com.emrah.ems_demo.service;

import com.emrah.ems_demo.model.Plan;
import com.emrah.ems_demo.repo.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlanService {


    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public List<Plan> getPlansByEmployeeId(Long employeeId) {
        return planRepository.findByEmployeeId(employeeId);
    }

    public Optional<Plan> getPlanById(Long id) {
        return planRepository.findById(id);
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public Plan updatePlan(Long id, Plan planDetails) {
        return planRepository.findById(id).map(plan -> {
            plan.setLocation(planDetails.getLocation());
            plan.setStartTime(planDetails.getStartTime());
            plan.setEndTime(planDetails.getEndTime());
            plan.setHourlyRate(planDetails.getHourlyRate());
            return planRepository.save(plan);
        }).orElseThrow(() -> new ResourceNotFoundException("Plan not found with id " + id));
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}
