package io.swag.corona.employer.application.service;

import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import io.swag.corona.employer.application.port.in.GetEmployerUseCase;
import io.swag.corona.employer.application.port.in.UpdateEmployerUseCase;
import io.swag.corona.employer.application.port.out.GetEmployerPort;
import io.swag.corona.employer.application.port.out.SaveEmployerPort;
import io.swag.corona.employer.domain.Employer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
@RequiredArgsConstructor
public class EmployerService implements
        CreateEmployerUseCase,
        GetEmployerUseCase,
        UpdateEmployerUseCase
{

    private final SaveEmployerPort saveEmployerPort;
    private final GetEmployerPort getEmployerPort;

    @Override
    public Employer create(String name, String domain, String homepage) {
        return saveEmployerPort.save(new Employer("", name, domain, homepage));
    }

    @Override
    public Employer getById(String employerId) {
        return getEmployerPort.getById(employerId);
    }

    @Override
    public Employer update(String id, String name, String domain, String homepage) {
        return saveEmployerPort.save(new Employer(id, name, domain, homepage));
    }
}
