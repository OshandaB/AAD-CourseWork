package lk.ijse.gdse66.shoeshopbackend.repository;

import lk.ijse.gdse66.shoeshopbackend.entity.ShoeSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ShoeSizeRepository extends JpaRepository<ShoeSize,String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE shoe_size SET quantity = :quantity, size = :size WHERE item_code = :itemCode", nativeQuery = true)
    void updateDetailsByItemCode(String itemCode, int quantity, String size);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM shoe_size WHERE item_code = :itemCode", nativeQuery = true)
    void deleteByItemCode(String itemCode);
}
