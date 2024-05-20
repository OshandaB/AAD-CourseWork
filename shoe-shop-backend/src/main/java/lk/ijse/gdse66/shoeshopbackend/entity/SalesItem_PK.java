package lk.ijse.gdse66.shoeshopbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SalesItem_PK implements Serializable {
    private String orderId;
    private String itemCode;
    private String size;
}
