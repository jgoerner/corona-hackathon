package io.swag.corona.employee.application.service;

import io.swag.corona.account.application.port.in.FetchActiveAccountUseCase;
import io.swag.corona.employee.application.port.in.*;
import io.swag.corona.employee.application.port.out.DeleteEmployeePort;
import io.swag.corona.employee.application.port.out.GetEmployeeIdByAccountIdPort;
import io.swag.corona.employee.application.port.out.GetEmployeePort;
import io.swag.corona.employee.application.port.out.SaveEmployeePort;
import io.swag.corona.employee.domain.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
@RequiredArgsConstructor
public class EmployeeIdService implements
        CreateEmployeeUseCase,
        DeleteEmployeeUseCase,
        GetEmployeeUseCase,
        UpdateEmployeeUseCase,
        GetActiveEmployeeIdUseCase
{

    private final SaveEmployeePort saveEmployeePort;
    private final DeleteEmployeePort deleteEmployeePort;
    private final GetEmployeePort getEmployeePort;
    private final FetchActiveAccountUseCase fetchActiveAccountUseCase;
    private final GetEmployeeIdByAccountIdPort getEmployeeIdByAccountIdPort;

    @Override
    public Employee create(String name, String ageGroup, String location, boolean[] skills) {
        var activeAccountId = fetchActiveAccountUseCase.activeAccount().getId();
        return saveEmployeePort.save(new Employee(null, name, ageGroup, location, skills), activeAccountId);
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
        var activeAccountId = fetchActiveAccountUseCase.activeAccount().getId();
        return saveEmployeePort.save(new Employee(id, name, ageGroup, location, skills),activeAccountId);
    }

    @Override
    public String getActiveEmployeeId() {
        var activeAccountId = fetchActiveAccountUseCase.activeAccount().getId();
        return getEmployeeIdByAccountIdPort.findByAccountId(activeAccountId);
    }
}
