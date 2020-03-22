package io.swag.corona.employee.application.service;

import com.github.javafaker.Faker;
import io.swag.corona.employee.application.port.in.*;
import io.swag.corona.employee.domain.Employee;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class EmployeeMockService implements CreateEmployeeUseCase, GetCurrentEmployeeUseCase, DeleteEmployeeUseCase, GetEmployeeUseCase, UpdateEmployeeUseCase {

    private Faker faker;

    @PostConstruct
    void init() {
        this.faker = new Faker();
    }

    @Override
    public Employee create(String name, String ageGroup, String location, boolean[] skills) {

        return new Employee(
                faker.bothify("????-????-????-????"),
                name,
                ageGroup,
                location,
                skills);
    }

    @Override
    public void deleteById(String id) {
        // do nothing :-)
    }

    @Override
    public Employee getById(String id) {

        boolean[] skills = new boolean[5];
        for (int i = 0; i < 5; i++) {
            skills[i] = faker.bool().bool();
        }

        return new Employee(
                id,
                faker.name().toString(),
                faker.numerify("??-??"),
                faker.numerify("?????"),
                skills);
    }

    @Override
    public Employee updateEmployee(String id, String name, String ageGroup, String location, boolean[] skills) {

        return new Employee(
                id,
                name,
                ageGroup,
                location,
                skills
        );

    }

    @Override
    public Employee currentEmployee() {
        return new Employee(
                faker.bothify("??-??"),
                faker.name().toString(),
                faker.numerify("??-??"),
                faker.numerify("?????"),
                new boolean[]{});
    }
}
