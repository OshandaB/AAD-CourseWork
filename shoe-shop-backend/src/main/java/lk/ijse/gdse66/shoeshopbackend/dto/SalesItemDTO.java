package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalesItemDTO implements Serializable {

    private String orderId;
    private String itemCode;
    private String itemName;
    private int qty;
    private Double unitPrice;
    private String size;


}
