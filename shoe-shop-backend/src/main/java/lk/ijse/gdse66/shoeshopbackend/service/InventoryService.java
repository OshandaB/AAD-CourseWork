package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryService {
    void saveInventory(InventoryDTO inventoryDTO);

    String generateNextShoeId(String name);

    List<InventoryDTO> gelAllProducts();

    void updateInventory(InventoryDTO inventoryDTO);

    void deleteInventory(String id);

    List<InventoryDTO> searchByItemName(String name);
}
