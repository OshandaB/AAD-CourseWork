package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.SalesItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SalesItemRepository extends JpaRepository<SalesItem,String> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM sales_item WHERE order_id = :id", nativeQuery = true)

    void deleteByOrderId(String id);

    List<SalesItem> findByOrderId(String id);

    SalesItem findByOrderIdAndItemCodeAndSize(String orderId, String ItemCode, String size);

}
