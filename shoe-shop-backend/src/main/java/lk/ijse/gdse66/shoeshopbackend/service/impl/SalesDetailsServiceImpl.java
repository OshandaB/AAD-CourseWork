package lk.ijse.gdse66.shoeshopbackend.service.impl;

import lk.ijse.gdse66.shoeshopbackend.dto.*;
import lk.ijse.gdse66.shoeshopbackend.entity.*;
import lk.ijse.gdse66.shoeshopbackend.repository.*;
import lk.ijse.gdse66.shoeshopbackend.service.SalesDetailsService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SalesDetailsServiceImpl implements SalesDetailsService {


    @Autowired
    SalesRepository salesRepository;

    @Autowired
    SalesItemRepository salesItemRepository;
    @Autowired
    ShoeSizeRepository shoeSizeRepository;
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<SalesDTO> gelAllOrders() {
        List<Sales> all = salesRepository.findAll();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        return all.stream()
                .map(sales -> {
                    SalesDTO dto = modelMapper.map(sales, SalesDTO.class);
                    dto.setEmployeeCode(sales.getEmployeeCode().getId());
                    dto.setSalesItemDTOList(sales.getSalesItems().stream()
                            .map(salesItem -> modelMapper.map(salesItem, SalesItemDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(String id) {
        Sales sales = salesRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sales with ID " + id + " does not exist."));
        int addedPoints = sales.getAddedPoints();
        double totalPayment = sales.getTotalPayment();



        if (sales.getCustomerCode() != null){
            String customerCodeId = sales.getCustomerCode().getId();
            Optional<Customer> customer = customerRepository.findById(customerCodeId);
            Customer customer1 = customer.get();
            customer1.setTotalPoints(customer1.getTotalPoints()+addedPoints);
            if (totalPayment>=800){
                customer1.setTotalPoints(customer1.getTotalPoints()-1);
            }
            customerRepository.save(customer1);

        }

        List<SalesItem> salesItems = salesItemRepository.findByOrderId(id);


        for (SalesItem salesItem : salesItems) {

            String itemCode = salesItem.getItemCode();
            String size = salesItem.getSize();
            int quantity = salesItem.getQty();
            Optional<Inventory> inventory = inventoryRepository.findById(salesItem.getItemCode());
            Inventory inventory1 = inventory.get();
            inventory1.setItemCode(salesItem.getItemCode());

            ShoeSize inventoryItem = shoeSizeRepository.findByItemCodeAndSize(inventory1,size);
            if (inventoryItem != null) {

                int newQuantity = inventoryItem.getQuantity() + quantity;
                inventoryItem.setQuantity(newQuantity);
                if (inventoryItem.getQuantity()<1){
                    inventoryItem.setStatus("Not Available");
                } else if (inventoryItem.getQuantity()<10) {
                    inventoryItem.setStatus("Low");
                }else if (inventoryItem.getQuantity()>10) {
                    inventoryItem.setStatus("Available");
                }
                shoeSizeRepository.save(inventoryItem);
            } else {

                throw new NotFoundException("Shoe Size  with code " + itemCode + " not found.");
            }
        }


        salesItemRepository.deleteByOrderId(id);
        salesRepository.deleteById(id);
    }

    @Override
    public List<SalesItemDTO> getAllSalesItems(String id) {
        List<SalesItem> salesItems = salesItemRepository.findByOrderId(id);
        return modelMapper.map(salesItems,new TypeToken<List<SalesItemDTO>>(){}.getType());

    }

    @Override
    public void deleteOrderItem(String orderId, String itemCode, String size) {

        Sales sales = salesRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Sales with ID " + orderId + " does not exist."));
        double totalPayment = sales.getTotalPayment();


        SalesItem salesItem = salesItemRepository.findByOrderIdAndItemCodeAndSize(orderId, itemCode,size);
        if (salesItem == null) {
            throw new NotFoundException("Item with ID " + itemCode + " not found in order with ID " + orderId);
        }
        double newPayment = totalPayment - salesItem.getUnitPrice();


        if (sales.getCustomerCode() != null){
            String customerCodeId = sales.getCustomerCode() .getId();
            Optional<Customer> customer = customerRepository.findById(customerCodeId);
            Customer customer1 = customer.get();
            if (newPayment<=800){
                customer1.setTotalPoints(customer1.getTotalPoints()-1);
            }
            customerRepository.save(customer1);

        }
        int quantity = salesItem.getQty();
        Optional<Inventory> inventory = inventoryRepository.findById(salesItem.getItemCode());
        Inventory inventory1 = inventory.get();
        inventory1.setItemCode(salesItem.getItemCode());


        ShoeSize inventoryItem = shoeSizeRepository.findByItemCodeAndSize(inventory1,size);
        if (inventoryItem != null) {

            int newQuantity = inventoryItem.getQuantity() + quantity;
            inventoryItem.setQuantity(newQuantity);
            if (inventoryItem.getQuantity()<1){
                inventoryItem.setStatus("Not Available");
            } else if (inventoryItem.getQuantity()<10) {
                inventoryItem.setStatus("Low");
            }else if (inventoryItem.getQuantity()>10) {
                inventoryItem.setStatus("Available");
            }
                shoeSizeRepository.save(inventoryItem);
        } else {

            throw new NotFoundException("Shoe Size  with code " + itemCode + " not found.");
        }


        salesItemRepository.delete(salesItem);
    }
}
