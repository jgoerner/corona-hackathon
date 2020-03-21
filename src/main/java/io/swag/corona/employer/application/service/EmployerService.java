package io.swag.corona.employer.application.service;

import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import io.swag.corona.employer.application.port.out.SaveEmployerPort;
import io.swag.corona.employer.domain.Employer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
@RequiredArgsConstructor
public class EmployerService implements CreateEmployerUseCase {

    private final SaveEmployerPort saveEmployerPort;

    @Override
    public Employer create(String name, String domain, String homepage) {
        return saveEmployerPort.save(new Employer("", name, domain, homepage));
    }

}
