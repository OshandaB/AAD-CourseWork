package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



public interface PlaceOrderService {
    void purchaseOrder(SalesDTO salesDTO);

    String generateNextId();
}
