package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    Employee findTopByOrderByIdDesc();

    List<Employee> findByNameStartingWith(String name);

    boolean existsByEmail (String email);

    Optional<Employee> findByEmail(String email);

}
