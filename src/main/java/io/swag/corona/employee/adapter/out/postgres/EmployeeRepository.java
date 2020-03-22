package io.swag.corona.employee.adapter.out.postgres;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeJPA, String> {
}
