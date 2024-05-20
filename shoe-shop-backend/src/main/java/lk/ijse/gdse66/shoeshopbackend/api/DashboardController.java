package lk.ijse.gdse66.shoeshopbackend.api;

import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.ResponseDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin
public class DashboardController {
    @Autowired
    ResponseDTO responseDTO;
    @Autowired
    SalesService salesService;

    @GetMapping(value = "filterByMonth/{month}/{year}")
    public ResponseEntity<ResponseDTO> filterByMonth(@PathVariable int month,@PathVariable int year) {
        try {
            List<SalesDTO> salesDTOList = salesService.filterByMonth(month,year);
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

    }
