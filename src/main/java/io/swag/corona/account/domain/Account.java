package io.swag.corona.account.domain;

import lombok.Value;

@Value
public class Account {

    String email;
    String password;
    String employeeId;
    String employerId;

}
