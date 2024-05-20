package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.*;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Employee;
import lk.ijse.gdse66.shoeshopbackend.entity.SalesItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalesDTO implements Serializable {
    private String orderId;
    private Date date;
    private double totalPayment;
    private String customerCode;
    private String customerName;
    private String paymentMethod;
    private int addedPoints;
    private String employeeCode;
    private String employeeName;
    private List<SalesItemDTO> salesItemDTOList;


}
