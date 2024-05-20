package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.*;
import lk.ijse.gdse66.shoeshopbackend.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShoeSizeDTO implements Serializable {
    private int id;
    private String itemCode;
    private String size;
    private int quantity;
    private String status;
}
