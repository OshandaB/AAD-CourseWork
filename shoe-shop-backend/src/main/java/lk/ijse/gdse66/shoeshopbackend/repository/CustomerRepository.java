package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    Customer findTopByOrderByIdDesc();
    List<Customer> findByNameStartingWith(String partialName);
}
