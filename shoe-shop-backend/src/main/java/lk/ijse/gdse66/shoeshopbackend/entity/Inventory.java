package lk.ijse.gdse66.shoeshopbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Inventory {
    @Id
    @Column(name = "item_code")
    private String itemCode;
    @Column(name = "item_name")
    private String itemDesc;

    @Column(name = "item_pic",columnDefinition = "LONGTEXT")
    private String itemPicture;

    private String category;
    private String size;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "supplier_code",referencedColumnName = "supplier_code",nullable = false)
    private Supplier supplierCode;
    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "unit_price_salary")
    private Double unitPriceSale;
    @Column(name = "unit_price_buy")
    private Double unitPriceBuy;
    @Column(name = "expected_profit")
    private Double expectedProfit;
    @Column(name = "profit_margin")
    private Double profitMargin;

    private String status;
    @OneToMany(mappedBy = "itemCode", cascade = CascadeType.ALL)
    private List<ShoeSize> shoeSizes;

}
