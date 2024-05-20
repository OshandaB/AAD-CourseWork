package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Employee;
import lk.ijse.gdse66.shoeshopbackend.entity.Sales;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface SalesRepository extends JpaRepository<Sales,String> {

    Sales findTopByOrderByOrderIdDesc();

    @Query(value = "SELECT * FROM sales WHERE MONTH(date) = :month AND YEAR(date) = :year", nativeQuery = true)
    List<Sales> findByMonthAndYear(int month,int year);
}
