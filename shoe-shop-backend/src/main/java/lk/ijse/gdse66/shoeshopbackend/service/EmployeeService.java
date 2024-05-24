package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    public  void saveEmployee(EmployeeDTO employeeDTO);

    List<EmployeeDTO> getAllEmployees();

    void updateEmployee(EmployeeDTO employeeDTO);

    void deleteEmployeee(String id);

    String generateNextId();

    List<EmployeeDTO> searchByName(String name);

    EmployeeDTO getOneEmployee(String id);

    int countEmployees();
}
