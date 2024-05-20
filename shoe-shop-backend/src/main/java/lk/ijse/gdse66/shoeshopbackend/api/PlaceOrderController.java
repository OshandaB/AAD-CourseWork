package lk.ijse.gdse66.shoeshopbackend.api;

import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.service.PlaceOrderService;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/placeOrder")
@CrossOrigin
public class PlaceOrderController {
    @Autowired
    PlaceOrderService placeOrderService;
    @PostMapping(value = "/orderPlace",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void purchaseOrder(@RequestBody SalesDTO salesDTO) {
        System.out.println(salesDTO.toString());

        placeOrderService.purchaseOrder(salesDTO);
    }


    @GetMapping("/genarateNextId")
    @ResponseStatus(HttpStatus.OK)
    public String generateNextOrderId() {

        String s = placeOrderService.generateNextId();
        if (s != null) {
            return s;

        }
        return null;
    }

}
