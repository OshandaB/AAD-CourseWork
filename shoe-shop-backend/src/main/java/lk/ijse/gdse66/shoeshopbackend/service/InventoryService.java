package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.ShoeSizeDTO;
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

    List<InventoryDTO> searchByCateFname(String cate);

    List<InventoryDTO> searchByCateGenderName(String cate);

    List<InventoryDTO> searchByCatePriceName(String price);

    InventoryDTO getOneProduct(String id);

    ShoeSizeDTO getQtyByItemCodeAndSize(String id, String size);
}
