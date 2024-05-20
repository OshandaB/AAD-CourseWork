package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory,String> {
    Inventory findTopByOrderByItemCodeDesc();
    List<Inventory> findByItemDescStartingWith(String partialName);
    Inventory findTopByItemCodeStartingWithOrderByItemCodeDesc(String name);
    List<Inventory> findByCategoryStartingWith(String cate);

    @Query(value = "SELECT * FROM inventory WHERE SUBSTRING(category, LENGTH(category), 1) != :gender", nativeQuery = true)
    List<Inventory> findCategoriesNotEndingWithGender(String gender);

    @Query(value = "SELECT * FROM inventory WHERE unit_price_salary BETWEEN :minPrice AND :maxPrice", nativeQuery = true)
    List<Inventory> findItemsInPriceRange(double minPrice, double maxPrice);

    Inventory findByItemCode(String itemCode);

}
