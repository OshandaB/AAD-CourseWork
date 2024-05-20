package lk.ijse.gdse66.shoeshopbackend.service.impl;

import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesItemDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.*;
import lk.ijse.gdse66.shoeshopbackend.repository.*;
import lk.ijse.gdse66.shoeshopbackend.service.PlaceOrderService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import lk.ijse.gdse66.shoeshopbackend.util.Level;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {
    @Autowired
    SalesRepository salesRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    ShoeSizeRepository shoeSizeRepository;

    @Autowired
    SalesItemRepository salesItemRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Override
    public void purchaseOrder(SalesDTO salesDTO) {
        String orderId = salesDTO.getOrderId();
        if (orderId != null && salesRepository.existsById(orderId)) {
            throw new DuplicateRecordException("Order with ID " + orderId + " already exists.");
        }
        Optional<Employee> optionalEmployee = employeeRepository.findById(salesDTO.getEmployeeCode());
        Employee employee = optionalEmployee.get();
        employee.setId(salesDTO.getEmployeeCode());
//        Optional<Customer> optionalCustomer = customerRepository.findById(salesDTO.getCustomerCode());
//        Customer customerCode = optionalCustomer.get();
//        customerCode.setId(salesDTO.getCustomerCode());

        Sales sales = modelMapper.map(salesDTO, Sales.class);
        sales.setEmployeeCode(employee);

        if (salesDTO.getCustomerCode() != null) {
                    Optional<Customer> optionalCustomer = customerRepository.findById(salesDTO.getCustomerCode());
        Customer customerCode = optionalCustomer.get();
        customerCode.setId(salesDTO.getCustomerCode());
            sales.setCustomerCode(customerCode);
        }

        System.out.println("----------------------Oshanda________________");
        System.out.println(sales.getCustomerCode());
//        sales.setCustomerCode(customerCode);
        salesRepository.save(sales);

        for (SalesItemDTO salesItemDTO : salesDTO.getSalesItemDTOList()) {
            Inventory inventory = new Inventory();
            inventory.setItemCode(salesItemDTO.getItemCode());
            ShoeSize shoeSize = shoeSizeRepository.findByItemCodeAndSize(inventory, salesItemDTO.getSize());
            shoeSize.setQuantity(shoeSize.getQuantity() - salesItemDTO.getQty());
            if (shoeSize.getQuantity()<1){
                shoeSize.setStatus("Not Available");
            } else if (shoeSize.getQuantity()<10) {
                shoeSize.setStatus("Low");
            }else if (shoeSize.getQuantity()>10) {
                shoeSize.setStatus("Available");
            }


            shoeSizeRepository.save(shoeSize);
            SalesItem salesItem = modelMapper.map(salesItemDTO, SalesItem.class);
            salesItemRepository.save(salesItem);

        }
        System.out.println("----------------------Banuka________________");

   /*     if (customerRepository.existsById(salesDTO.getCustomerCode())) {
            Optional<Customer> customerOptional = customerRepository.findById(salesDTO.getCustomerCode());

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                customer.setRecentPurchaseDate(salesDTO.getDate());
                if (salesDTO.getTotalPayment()>=800){
                    customer.setTotalPoints(customer.getTotalPoints()+1);
                }
                // If you have a modelMapper mapping, include it here
                // modelMapper.map(salesDTO, customer);
                customerRepository.save(customer);
            } else {
                throw new NotFoundException("Customer with ID " + salesDTO.getCustomerCode() + " does not exist.");


            }
        }*/

        if (salesDTO.getCustomerCode() != null) {
            if (customerRepository.existsById(salesDTO.getCustomerCode())) {
                Optional<Customer> customerOptional = customerRepository.findById(salesDTO.getCustomerCode());

                if (customerOptional.isPresent()) {
                    Customer customer = customerOptional.get();
                    customer.setRecentPurchaseDate(salesDTO.getDate());
                    customer.setTotalPoints(customer.getTotalPoints()-salesDTO.getAddedPoints());
                    if (salesDTO.getTotalPayment() >= 800) {
                        customer.setTotalPoints(customer.getTotalPoints() + 1);
                    }
                    if(customer.getTotalPoints()<50){
                        customer.setLevel(Level.NEW);
                    } else if (customer.getTotalPoints()>50 && customer.getTotalPoints()<100) {
                        customer.setLevel(Level.BRONZE);
                    }else if (customer.getTotalPoints()>100 && customer.getTotalPoints()<200) {
                        customer.setLevel(Level.SILVER);
                    }else if (customer.getTotalPoints()>200) {
                        customer.setLevel(Level.GOLD);
                    }

                    customerRepository.save(customer);
                } else {
                    throw new NotFoundException("Customer with ID " + salesDTO.getCustomerCode() + " does not exist.");
                }
            } else {
                throw new NotFoundException("Customer with ID " + salesDTO.getCustomerCode() + " does not exist.");
            }
        }

    }

    @Override
    public String generateNextId() {
        Sales lastOrder = salesRepository.findTopByOrderByOrderIdDesc();

        System.out.println(lastOrder);

        if (lastOrder == null) {
            return "";
        }else{
            return lastOrder.getOrderId();
        }
    }
}
