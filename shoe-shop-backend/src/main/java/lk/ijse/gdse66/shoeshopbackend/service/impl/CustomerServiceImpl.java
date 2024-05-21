package lk.ijse.gdse66.shoeshopbackend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.EmailLog;
import lk.ijse.gdse66.shoeshopbackend.entity.Supplier;
import lk.ijse.gdse66.shoeshopbackend.repository.CustomerRepository;
import lk.ijse.gdse66.shoeshopbackend.repository.EmailLogRepository;
import lk.ijse.gdse66.shoeshopbackend.service.CustomerService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import lk.ijse.gdse66.shoeshopbackend.util.EmailSender;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    private EmailLogRepository emailLogRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EmailSender emailSender;
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

    @Override
    public CustomerDTO getOneCustomer(String id) {
        if (customerRepository.existsById(id)) {
            Optional<Customer> customer = customerRepository.findById(id);
            return modelMapper.map(customer.get(), CustomerDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public void sendEmail() {
//        LocalDate today = LocalDate.now();
        LocalDate today = LocalDate.now();
//        Instant instant = today.atStartOfDay(ZoneId.systemDefault()).toInstant();
//        Date date = Date.from(instant);
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();
//        List<Customer> birthdayCustomers = customerRepository.findByDob(date);
        List<Customer> birthdayCustomers = customerRepository.findByMonthAndDay(month, day);

        System.out.println(birthdayCustomers);
        for (Customer customer : birthdayCustomers) {
            if (!isBirthdayWishSent(customer.getId(), today)) {
                System.out.println("email sent to "+customer.getEmail()+" "+customer.getName()+" "+customer.getId()+" "+today);
                String subject = "Happy Birthday!";
                String text = String.format("Dear %s, \n\nHappy Birthday! We hope you have a great day!\n\nBest Regards,\nHello Shoe Shop (PVT) LTD", customer.getName());
                emailSender.sendSimpleMessage(customer.getEmail(), subject, text);
                logEmailSent(customer.getId(), today);
            }else {
                System.out.println("email already sent to "+customer.getEmail()+" "+customer.getName()+" "+customer.getId()+" "+today);
            }

        }
//                    String subject = "Happy Birthday!";
//            String text = String.format("Dear %s, \n\nHappy Birthday! We hope you have a great day!\n\nBest Regards,\nYour Company", "oshanda");
//            emailSender.sendSimpleMessage("kaveensandeepa66@gmail.com", subject, text);

    }
    private boolean isBirthdayWishSent(String customerId, LocalDate date) {
        Date utilDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return !emailLogRepository.findByCustomerIdAndSentDate(customerId, utilDate).isEmpty();
    }

    private void logEmailSent(String customerId, LocalDate date) {
        Date utilDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());

        EmailLog emailLog = new EmailLog();
        emailLog.setCustomerId(customerId);
        emailLog.setSentDate(utilDate);
        emailLogRepository.save(emailLog);
    }
}
