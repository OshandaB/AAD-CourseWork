package lk.ijse.gdse66.shoeshopbackend.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.shoeshopbackend.util.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    @Column(name = "supplier_code")
    private String id;

    @Column(name = "supplier_name")
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "address_line_01")
    private String addressLine01;

    @Column(name = "address_line_02")
    private String addressLine02;



    @Column(name = "address_line_03")
    private String addressLine03;

    @Column(name = "address_line_04")
    private String addressLine04;

    @Column(name = "address_line_05")
    private String addressLine05;

    @Column(name = "address_line_06")
    private String addressLine06;

    @Column(name = "contact_no_1")
    private String contactNo1;

    @Column(name = "contact_no_2")
    private String contactNo2;

    private String email;
}
