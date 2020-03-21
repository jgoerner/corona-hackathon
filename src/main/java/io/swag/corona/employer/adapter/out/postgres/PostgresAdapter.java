package io.swag.corona.employer.adapter.out;

import io.swag.corona.employer.application.port.out.SaveEmployerPort;
import io.swag.corona.employer.domain.Employer;
import org.springframework.stereotype.Component;

@Component
public class PostgresAdapter implements SaveEmployerPort {

    @Override
    public Employer save(Employer employer) {
        return employer;
    }
}
