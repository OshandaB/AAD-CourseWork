package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.SalesItem;
import lk.ijse.gdse66.shoeshopbackend.projection.SalesItemByYearMonthProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface SalesItemRepository extends JpaRepository<SalesItem,String> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM sales_item WHERE order_id = :id", nativeQuery = true)

    void deleteByOrderId(String id);

    List<SalesItem> findByOrderId(String id);

    SalesItem findByOrderIdAndItemCodeAndSize(String orderId, String ItemCode, String size);
    @Query(value = "SELECT item_code FROM sales_item GROUP BY item_code ORDER BY COUNT(item_code) DESC LIMIT 4", nativeQuery = true)
    List<String> findMostSoldItemCode();

//
//    @Query(value = "SELECT sales_item.item_code " +
//            "FROM sales_item  " +
//            "JOIN sales  ON sales_item.order_id = sales.order_id " +
//            "WHERE EXTRACT(MONTH FROM sales.date) = :month " +
//            "AND EXTRACT(YEAR FROM sales.date) = :year " +
//            "GROUP BY sales_item.item_code " +
//            "ORDER BY COUNT(si.item_code) DESC " +
//            "LIMIT 1", nativeQuery = true)
//    String findMostSoldItemCodeByMonthAndYear( int month, int year);

    @Query(value = "SELECT sales.order_id AS salesId, " +
            "DATE(sales.date) AS salesDate, " +
            "sales_item.item_name AS itemName, " +
            "sales_item.item_code AS itemCode, " +
            "sales_item.qty AS qty " +
            "FROM sales " +
            "INNER JOIN sales_item ON sales_item.order_id = sales.order_id " +
            "WHERE YEAR(sales.date) = :year AND MONTH(sales.date) = :month",
            nativeQuery = true)
    List<SalesItemByYearMonthProjection> findOrderDetailsWithDate(@Param("year") int year, @Param("month") int month);
}
