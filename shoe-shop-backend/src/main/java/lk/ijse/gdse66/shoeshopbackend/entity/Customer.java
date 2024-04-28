package lk.ijse.gdse66.shoeshopbackend.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.shoeshopbackend.util.Gender;
import lk.ijse.gdse66.shoeshopbackend.util.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @Column(name = "customer_code")
    private String id;

    @Column(name = "customer_name")
    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Temporal(TemporalType.DATE)
    @Column(name = "join_date")
    private Date joinDate;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Column(name = "total_points")
    private Integer totalPoints;

    @Temporal(TemporalType.DATE)
    private Date dob;

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

    @Column(name = "contact_no")
    private String contactNo;

    private String email;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recent_purchase_date")
    private Date recentPurchaseDate;


}
