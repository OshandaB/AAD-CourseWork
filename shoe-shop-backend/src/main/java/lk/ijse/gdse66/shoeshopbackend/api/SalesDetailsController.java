package lk.ijse.gdse66.shoeshopbackend.api;


import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.ResponseDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesItemDTO;
import lk.ijse.gdse66.shoeshopbackend.service.SalesDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/salesDetails")
@CrossOrigin
public class SalesDetailsController {

    @Autowired
    private SalesDetailsService salesDetailsService;
    @Autowired
    private ResponseDTO responseDTO;

    @GetMapping(value = "/gelAllOrders", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> gelAllOrders() {

        try {
            List<SalesDTO> salesDTOList = salesDetailsService.gelAllOrders();
            System.out.println(salesDTOList);
            if (salesDTOList == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(salesDTOList);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping(value = "/delete/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String id) {

        salesDetailsService.deleteOrder(id);
    }

    @DeleteMapping(value = "/delete/{orderId}/{itemCode}/{size}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrderItem(@PathVariable String orderId,@PathVariable String itemCode,@PathVariable String size) {

        salesDetailsService.deleteOrderItem(orderId,itemCode,size);
    }

    @GetMapping(value = "/gelAllSalesItems/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> getAllSalesItems(@PathVariable String id) {

        try {
            List<SalesItemDTO> salesItems = salesDetailsService.getAllSalesItems(id);
            System.out.println(salesItems);
            if (salesItems == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(salesItems);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
