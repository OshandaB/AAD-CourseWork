package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesItemDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface SalesDetailsService {


    List<SalesDTO> gelAllOrders();

    void deleteOrder(String id);

    List<SalesItemDTO> getAllSalesItems(String id);

    void deleteOrderItem(String orderId, String itemCode, String size);
}
