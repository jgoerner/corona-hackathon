package io.swag.corona.employee.adapter.out.postgres;

import io.swag.corona.employee.domain.Employee;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeJPA {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    String id;
    String name;
    String ageGroup;
    String location;

    static EmployeeJPA of(Employee e) {
        return new EmployeeJPA(
                e.getId(),
                e.getName(),
                e.getAgeGroup(),
                e.getLocation()
        );
    }

    Employee toDomain() {
        return new Employee(
                this.id,
                this.name,
                this.ageGroup,
                this.location,
                new boolean[5]
        );
    }
}