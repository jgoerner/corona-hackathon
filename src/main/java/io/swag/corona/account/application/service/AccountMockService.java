package io.swag.corona.account.application.service;

import com.github.javafaker.Faker;
import io.swag.corona.account.application.port.in.*;
import io.swag.corona.account.domain.Account;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AccountMockService implements
        ChangePasswordUseCase, CheckActiveSessionUseCase, FetchActiveAccountUseCase, LogInUseCase, RegisterUseCase {

    private Faker faker;

    @PostConstruct
    void init() {
        this.faker = new Faker();
    }

    @Override
    public Account changePassword(String oldPassword, String newPassword) {

        return new Account(
                faker.bothify("????##@gmail.com"),
                newPassword,
                faker.bothify("????-????-????-????"),
                faker.bothify("????-????-????-????")
        );
    }

    @Override
    public boolean hasActiveSession() { return faker.bool().bool(); }

    @Override
    public Account activeAccount() {

        return new Account(
                faker.bothify("????##@gmail.com"),
                faker.lebowski().actor(),
                faker.bothify("????-????-????-????"),
                faker.bothify("????-????-????-????")
        );
    }

    @Override
    public boolean login(String email, String password) {
        return faker.bool().bool();
    }

    @Override
    public boolean register(String email, String password) {
        return faker.bool().bool();
    }
}
