package lk.ijse.gdse66.shoeshopbackend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.repository.CustomerRepository;
import lk.ijse.gdse66.shoeshopbackend.service.CustomerService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        String customerId = customerDTO.getId();
        if (customerId != null && customerRepository.existsById(customerId)) {
            throw new DuplicateRecordException("Customer with ID " + customerId + " already exists.");
        }
        Customer customer = modelMapper.map(customerDTO, Customer.class);
        customerRepository.save(customer);
    }


    @Override
    public List<CustomerDTO> gelAllCustomers() {
        List<Customer> all = customerRepository.findAll();
        return modelMapper.map(all,new TypeToken<List<CustomerDTO>>(){}.getType());
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        String customerId = customerDTO.getId();
        if (!customerRepository.existsById(customerId)) {
            throw new NotFoundException("Customer with ID " + customerId + " does not exist.");
        }

        Customer customer = modelMapper.map(customerDTO, Customer.class);
        customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(String id) {

        if (!customerRepository.existsById(id)) {
            throw new NotFoundException("Customer with ID " + id + " does not exist.");
        }

        customerRepository.deleteById(id);
    }

    @Override
    public String generateNextId() {
        Customer lastCustomer = customerRepository.findTopByOrderByIdDesc();

        System.out.println(lastCustomer);

        if (lastCustomer == null) {
            return "";
        }else{
            return lastCustomer.getId();
        }
    }

    @Override
    public List<CustomerDTO> searchByName(String name) {
        List<Customer> customerList = customerRepository.findByNameStartingWith(name);
        return modelMapper.map(customerList,new TypeToken<List<CustomerDTO>>(){}.getType());

    }
}
