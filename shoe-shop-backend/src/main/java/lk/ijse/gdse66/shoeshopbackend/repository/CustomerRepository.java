package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    Customer findTopByOrderByIdDesc();
    List<Customer> findByNameStartingWith(String partialName);

//    List<Customer> findByDob(Date date);
@Query(value = "SELECT * FROM customer  WHERE MONTH(dob) = ?1 AND DAY(dob) = ?2", nativeQuery = true)
List<Customer> findByMonthAndDay(int month, int day);

  //get customers count
    @Query(value = "SELECT COUNT(customer_code) FROM customer", nativeQuery = true)
    int getCustomerCount();
}
