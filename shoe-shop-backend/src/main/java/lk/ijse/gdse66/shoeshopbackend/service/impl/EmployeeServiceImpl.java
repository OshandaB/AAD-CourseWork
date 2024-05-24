package lk.ijse.gdse66.shoeshopbackend.service.impl;

import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Employee;
import lk.ijse.gdse66.shoeshopbackend.repository.CustomerRepository;
import lk.ijse.gdse66.shoeshopbackend.repository.EmployeeRepository;
import lk.ijse.gdse66.shoeshopbackend.service.EmployeeService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void saveEmployee(EmployeeDTO employeeDTO) {
        String employeeId = employeeDTO.getId();
        if (employeeId != null && employeeRepository.existsById(employeeId)) {
            throw new DuplicateRecordException("Employee with ID " + employeeId + " already exists.");
        }
        if (employeeDTO.getEmail() != null && employeeRepository.existsByEmail(employeeDTO.getEmail())) {
            throw new DuplicateRecordException("Employee with Email " + employeeDTO.getEmail() + " already exists.");
        }
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        employeeRepository.save(employee);
    }


    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> all = employeeRepository.findAll();
        return modelMapper.map(all,new TypeToken<List<EmployeeDTO>>(){}.getType());
    }

    @Override
    public void updateEmployee(EmployeeDTO employeeDTO) {
        String employeeId = employeeDTO.getId();
        if (!employeeRepository.existsById(employeeId)) {
            throw new NotFoundException("Employee with ID " + employeeId + " does not exist.");
        }
        if (employeeDTO.getEmail() != null && employeeRepository.existsByEmail(employeeDTO.getEmail())) {
            throw new DuplicateRecordException("Employee with Email " + employeeDTO.getEmail() + " already exists.");
        }
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployeee(String id) {

        if (!employeeRepository.existsById(id)) {
            throw new NotFoundException("Employee with ID " + id + " does not exist.");
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public String generateNextId() {
        Employee lastEmployee = employeeRepository.findTopByOrderByIdDesc();


        System.out.println(lastEmployee);

        if (lastEmployee == null) {
            return "";
        }else{
            return lastEmployee.getId();
        }
    }

    @Override
    public List<EmployeeDTO> searchByName(String name) {
        List<Employee> employeeList = employeeRepository.findByNameStartingWith(name);
        return modelMapper.map(employeeList,new TypeToken<List<EmployeeDTO>>(){}.getType());
    }

    @Override
    public EmployeeDTO getOneEmployee(String email) {
        if (employeeRepository.existsById(email)) {
            Optional<Employee> employee = employeeRepository.findByEmail(email);
            return modelMapper.map(employee.get(), EmployeeDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public int countEmployees() {
        return (int) employeeRepository.count();
    }
}
