package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    public  void saveCustomer(CustomerDTO customerDTO);
    public List<CustomerDTO> gelAllCustomers();

    public  void updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer(String id);

    String generateNextId();
    List<CustomerDTO> searchByName(String name);

    CustomerDTO getOneCustomer(String id);

    void sendEmail();
}
