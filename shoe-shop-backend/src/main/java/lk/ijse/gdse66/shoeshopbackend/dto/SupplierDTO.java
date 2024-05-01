package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.gdse66.shoeshopbackend.util.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDTO implements Serializable {

    private String id;

    private String name;

    private Category category;
    private String addressLine01;
    private String addressLine02;

    private String addressLine03;


    private String addressLine04;

    private String addressLine05;


    private String addressLine06;


    private String contactNo1;


    private String contactNo2;

    private String email;
}
