package io.swag.corona.employee.application.service;

import io.swag.corona.employee.application.port.in.CreateEmployeeUseCase;
import io.swag.corona.employee.application.port.in.DeleteEmployeeUseCase;
import io.swag.corona.employee.application.port.in.GetEmployeeUseCase;
import io.swag.corona.employee.application.port.in.UpdateEmployeeUseCase;
import io.swag.corona.employee.application.port.out.DeleteEmployeePort;
import io.swag.corona.employee.application.port.out.GetEmployeePort;
import io.swag.corona.employee.application.port.out.SaveEmployeePort;
import io.swag.corona.employee.domain.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
@RequiredArgsConstructor
public class EmployeeService implements
        CreateEmployeeUseCase,
        DeleteEmployeeUseCase,
        GetEmployeeUseCase,
        UpdateEmployeeUseCase
{

    private final SaveEmployeePort saveEmployeePort;
    private final DeleteEmployeePort deleteEmployeePort;
    private final GetEmployeePort getEmployeePort;

    @Override
    public Employee create(String name, String ageGroup, String location, boolean[] skills) {
        return saveEmployeePort.save(new Employee(null, name, ageGroup, location, skills));
    }

    @Override
    public void deleteById(String id) {
        deleteEmployeePort.deleteById(id);
    }

    @Override
    public Employee getById(String employerId) {
        return getEmployeePort.getById(employerId);
    }

    @Override
    public Employee updateEmployee(String id, String name, String ageGroup, String location, boolean[] skills) {
        return saveEmployeePort.save(new Employee(id, name, ageGroup, location, skills));
    }
}
