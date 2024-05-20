package lk.ijse.gdse66.shoeshopbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Sales {
    @Id
    @Column(name = "order_id")
    private String orderId;
    @Temporal(TemporalType.DATE)
    private Date date;
    private double totalPayment;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customer_code",referencedColumnName = "customer_code",nullable = true)
    private Customer customerCode;
    private String customerName;
    private String paymentMethod;
    private int addedPoints;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "employee_code",referencedColumnName = "employee_code",nullable = false)
    private Employee employeeCode;
    private String employeeName;
    @OneToMany(mappedBy = "sales",cascade = CascadeType.ALL)
    private List<SalesItem> salesItems;
}
