package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EmailLogRepository extends JpaRepository<EmailLog,String> {
    List<EmailLog> findByCustomerIdAndSentDate(String customerId, Date sentDate);
}

