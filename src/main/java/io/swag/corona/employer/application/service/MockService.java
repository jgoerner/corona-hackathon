package io.swag.corona.employer.application.service;

import com.github.javafaker.Faker;
import io.swag.corona.employer.application.port.in.*;
import io.swag.corona.employer.domain.Employer;
import io.swag.corona.employer.domain.Job;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class MockService implements
        CreateEmployerUseCase,
        GetEmployerUseCase,
        UpdateEmployerUseCase,
        CreateJobUseCase,
        GetJobUseCase,
        GetJobsUseCase,
        UpdateJobUseCase,
        DeleteJobUseCase
{

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

    @Override
    public Job create(String title, String description, String location, Long qty, Long salary) {
        return new Job(
                faker.bothify("????-????-????-????"),
                title,
                description,
                location,
                qty,
                salary
        );
    }

    @Override
    public void delete(String jobId) {
        // do nothing :-)
    }

    @Override
    public Job findById(String id) {
        return new Job(
                id,
                faker.book().title(),
                faker.shakespeare().romeoAndJulietQuote(),
                faker.rickAndMorty().location(),
                faker.number().numberBetween(0L, 10L),
                faker.number().numberBetween(10L, 12L)
        );
    }

    @Override
    public List<Job> findAll() {
        return IntStream.range(0, 10)
                .mapToObj(x -> new Job(
                        faker.bothify("????-????-????-????"),
                        faker.book().title(),
                        faker.shakespeare().romeoAndJulietQuote(),
                        faker.rickAndMorty().location(),
                        faker.number().numberBetween(0L, 10L),
                        faker.number().numberBetween(10L, 12L)))
                .collect(Collectors.toList());
    }

    @Override
    public Job update(String id, String title, String description, String location, Long qty, Long salary) {
        return new Job(
                id,
                title,
                description,
                location,
                qty,
                salary
        );
    }
}
