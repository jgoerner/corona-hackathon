package io.swag.corona.account.application.port.in;

public interface LogInUseCase {

    boolean login(String email, String password);
}
