package io.swag.corona.employer.application.service;

import com.github.javafaker.Faker;
import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import io.swag.corona.employer.application.port.in.GetEmployerUseCase;
import io.swag.corona.employer.application.port.in.UpdateEmployerUseCase;
import io.swag.corona.employer.domain.Employer;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MockService implements CreateEmployerUseCase, GetEmployerUseCase, UpdateEmployerUseCase {

    private Faker faker;

    @PostConstruct
    void init() {
        this.faker = new Faker();
    }

    @Override
    public Employer create(String name, String domain, String homepage) {
        return new Employer(
                faker.bothify("????-????-????-????"),
                name,
                domain,
                homepage);
    }

    @Override
    public Employer getById(String employerId) {
        return new Employer(
                employerId,
                faker.name().name(),
                faker.commerce().department(),
                faker.internet().domainName());
    }

    @Override
    public Employer update(String id, String name, String domain, String homepage) {
        return new Employer(
                id,
                name,
                domain,
                homepage);
    }
}
