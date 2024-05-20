package lk.ijse.gdse66.shoeshopbackend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.shoeshopbackend.dto.*;
import lk.ijse.gdse66.shoeshopbackend.service.CustomerService;
import lk.ijse.gdse66.shoeshopbackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    InventoryService inventoryService;
    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveInventory( @Valid @RequestBody InventoryDTO inventoryDTO) {

        inventoryService.saveInventory(inventoryDTO);
    }
    @PatchMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateInventory(@Valid @RequestBody InventoryDTO inventoryDTO) {

        inventoryService.updateInventory(inventoryDTO);
    }
    @DeleteMapping(value = "/delete/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInventory(@PathVariable String id) {

        inventoryService.deleteInventory(id);
    }
    @GetMapping("/genarateNextId/{name}")
    @ResponseStatus(HttpStatus.OK)
    public String generateNextItemId(@PathVariable String name) {

        String s = inventoryService.generateNextShoeId(name);
        if (s != null) {
            return s;

        }
        return null;
    }

    @GetMapping(value = "/gelAllProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> gelAllProducts() {

        try {
            List<InventoryDTO> inventoryDTOS = inventoryService.gelAllProducts();
            if (inventoryDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/searchByName/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> searchByItemName(@PathVariable String name) {

        try {
            List<InventoryDTO> inventoryDTOS = inventoryService.searchByItemName(name);
            if (inventoryDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/searchByCateFname/{cate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> searchByCateFname(@PathVariable String cate) {

        try {
            List<InventoryDTO> inventoryDTOS = inventoryService.searchByCateFname(cate);
            if (inventoryDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/searchByCateGenderName/{cate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> searchByCateGenderName(@PathVariable String cate) {

        try {
            List<InventoryDTO> inventoryDTOS = inventoryService.searchByCateGenderName(cate);
            if (inventoryDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/searchByCatePrice/{price}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> searchByCatePriceName(@PathVariable String price) {

        try {
            List<InventoryDTO> inventoryDTOS = inventoryService.searchByCatePriceName(price);
            if (inventoryDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getOneProduct/{id}")
    public ResponseEntity<ResponseDTO> getOneProduct(@PathVariable String id) {
        try {
            InventoryDTO inventoryDTO = inventoryService.getOneProduct(id);

            if(inventoryDTO==null){
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.CREATED);
            responseDTO.setMessage("Success");
            responseDTO.setData(inventoryDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getQty/{id}/{size}")
    public ResponseEntity<ResponseDTO> getQtyByItemCodeAndSize(@PathVariable String id,@PathVariable String size) {
        try {
            ShoeSizeDTO shoeSizeDTO = inventoryService.getQtyByItemCodeAndSize(id,size);

            if(shoeSizeDTO==null){
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.CREATED);
            responseDTO.setMessage("Success");
            responseDTO.setData(shoeSizeDTO);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
