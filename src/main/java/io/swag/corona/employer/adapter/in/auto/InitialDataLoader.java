package io.swag.corona.employer.adapter.in.auto;

import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Log4j2
@RequiredArgsConstructor
@Component
public class InitialDataLoader implements CommandLineRunner {

    private final CreateEmployerUseCase createEmployerUseCase;

    @Override
    public void run(String... args) throws Exception {
        var employer = createEmployerUseCase.create("LIDL", "Einzelhandel", "http://lidl.de");
        log.info(employer);
    }
}
