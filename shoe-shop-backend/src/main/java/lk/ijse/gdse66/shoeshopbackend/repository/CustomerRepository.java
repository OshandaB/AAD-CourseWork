package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    Customer findTopByOrderByIdDesc();
    List<Customer> findByNameStartingWith(String partialName);

    List<Customer> findByDob(Date date);
}
