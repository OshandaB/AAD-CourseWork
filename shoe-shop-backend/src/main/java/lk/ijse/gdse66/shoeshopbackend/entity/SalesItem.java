package lk.ijse.gdse66.shoeshopbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "sales_item")
@IdClass(SalesItem_PK.class)
public class SalesItem {
    @Id
    @Column(name = "order_id")
    private String orderId;
    @Id
    @Column(name = "item_code")
    private String itemCode;
    @Id
    private String size;
    private String itemName;
    private int qty;
    private Double unitPrice;


    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "order_id",insertable = false,updatable = false)
    private Sales sales;

    //Out-verse
    @ManyToOne
    @JoinColumn(name = "item_code",referencedColumnName = "item_code",insertable = false,updatable = false)
    private Inventory inventory;
}
