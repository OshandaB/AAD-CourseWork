package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory,String> {
    Inventory findTopByOrderByItemCodeDesc();
    List<Inventory> findByItemDescStartingWith(String partialName);
    Inventory findTopByItemCodeStartingWithOrderByItemCodeDesc(String name);
}
