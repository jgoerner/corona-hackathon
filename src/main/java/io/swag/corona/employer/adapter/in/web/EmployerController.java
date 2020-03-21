package io.swag.corona.employer.adapter.in.web;

import io.swag.corona.employer.application.port.in.CreateEmployerUseCase;
import io.swag.corona.employer.domain.Employer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class EmployerController {

    private final CreateEmployerUseCase createEmployerUseCase;

    @RequestMapping(path = "/employers", method = RequestMethod.POST)
    Employer create(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("homepage") String homepage) {
        return createEmployerUseCase.create(name, description, homepage);
    }
}
