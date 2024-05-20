package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lk.ijse.gdse66.shoeshopbackend.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryDTO {
    @NotNull(message = "ItemCode is required")
    private String itemCode;

    @NotBlank(message = "ItemDesc is required")
    private String itemDesc;

    @NotNull(message = "ItemPic is required")
    private String itemPicture;

    @NotNull(message = "category is required")
    private String category;

    @NotNull(message = "supplierCode is required")
    private String supplierCode;
    @NotNull(message = "supplierName is required")
    private String supplierName;

    @Positive(message = "UnitPriceSale must be a positive number")
    private Double unitPriceSale;
    @Positive(message = "UnitPriceSale must be a positive number")
    private Double unitPriceBuy;

    @NotNull(message = "expectedProfit is required")
    private Double expectedProfit;
    @NotNull(message = "profitMargin is required")
    private Double profitMargin;


    private List<ShoeSizeDTO> shoeSizeDTOList;
}
