package io.swag.corona.employer.application.service;

import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import io.swag.corona.employer.domain.Employer;
import org.springframework.stereotype.Component;

@Component
public class MockService implements CreateEmployerUseCase {

    @Override
    public Employer create(String name, String domain, String homepage) {
        return new Employer("ABCD", "ALDI", "Einzelhandel", "http://aldi.de");
    }
}
