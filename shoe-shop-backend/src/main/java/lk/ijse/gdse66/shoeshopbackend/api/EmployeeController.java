package lk.ijse.gdse66.shoeshopbackend.api;


import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.ResponseDTO;
import lk.ijse.gdse66.shoeshopbackend.service.CustomerService;
import lk.ijse.gdse66.shoeshopbackend.service.EmployeeService;
import lk.ijse.gdse66.shoeshopbackend.util.CivilStatus;
import lk.ijse.gdse66.shoeshopbackend.util.Gender;
import lk.ijse.gdse66.shoeshopbackend.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    private ResponseDTO responseDTO;
    @Autowired
    private Validator validator;
    @PostMapping(value = "/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveEmployee(@Valid @RequestPart("employeeCode") String id,
            @RequestPart("profilePic") MultipartFile profilePic,
            @RequestPart("employeeName") String name,
            @RequestPart("email1") String email,
            @RequestPart(value = "contact") String contact,
            @RequestPart("gender") String gender,
            @RequestPart("designation") String designation,
            @RequestPart("accessRole") String role,
            @RequestPart("status") String civilStatus,
            @RequestPart("attachedBranch") String branch,
            @RequestPart("guardianName") String guardianName,
            @RequestPart("guardianContact") String guardianContact,
            @RequestPart(value = "addressLine01",required = false) String addressLine1,
            @RequestPart(value = "addressLine02",required = false) String addressLine2,
            @RequestPart("addressLine03") String addressLine3,
            @RequestPart("addressLine04") String addressLine4,
            @RequestPart("addressLine05") String addressLine5,
            @RequestPart("dob") String dob,
            @RequestPart("joinDate") String joinDate
    ) throws IOException, ParseException {
        System.out.println(id);
        System.out.println(profilePic);
//        String encodedPic = Base64.getEncoder()
//                .encodeToString(profilePic.getBytes());
//        System.out.println(encodedPic);
        String pic = Base64.getEncoder().encodeToString(profilePic.getBytes());
        System.out.println(name);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate1 = dateFormat.parse(joinDate);
        Date newDate2 = dateFormat.parse(dob);
        EmployeeDTO employeeDTO = new EmployeeDTO(id, name, pic, Gender.valueOf(gender), CivilStatus.valueOf(civilStatus), designation, Role.valueOf(role), newDate2, newDate1 , branch, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5, contact, email, guardianContact, guardianName);
        Set<ConstraintViolation<EmployeeDTO>> violations = validator.validate(employeeDTO);

        if (!violations.isEmpty()) {

            for (ConstraintViolation<EmployeeDTO> violation : violations) {
                System.out.println(violation.getMessage());



            }
            throw new ValidationException("Data Validation Failed!!!");
        } else {

            employeeService.saveEmployee(employeeDTO);
        }


    }

    @GetMapping(value = "/getAllEmployees", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> getAllEmployees() {

        try {
            List<EmployeeDTO> employeeDTOS = employeeService.getAllEmployees();
            System.out.println(employeeDTOS);
            if (employeeDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(employeeDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateEmployee(

            @RequestPart("employeeCode") String id,
            @RequestPart("profilePic") MultipartFile profilePic,
            @RequestPart("employeeName") String name,
            @RequestPart("email1") String email,
            @RequestPart(value = "contact") String contact,
            @RequestPart("gender") String gender,
            @RequestPart("designation") String designation,
            @RequestPart("accessRole") String role,
            @RequestPart("status") String civilStatus,
            @RequestPart("attachedBranch") String branch,
            @RequestPart("guardianName") String guardianName,
            @RequestPart("guardianContact") String guardianContact,
            @RequestPart(value = "addressLine01",required = false) String addressLine1,
            @RequestPart(value = "addressLine02",required = false) String addressLine2,
            @RequestPart("addressLine03") String addressLine3,
            @RequestPart("addressLine04") String addressLine4,
            @RequestPart("addressLine05") String addressLine5,
            @RequestPart("dob") String dob,
            @RequestPart("joinDate") String joinDate
    ) throws ParseException, IOException {
        String pic = Base64.getEncoder().encodeToString(profilePic.getBytes());
        System.out.println(name);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate1 = dateFormat.parse(joinDate);
        Date newDate2 = dateFormat.parse(dob);
        EmployeeDTO employeeDTO = new EmployeeDTO(id, name, pic, Gender.valueOf(gender), CivilStatus.valueOf(civilStatus), designation, Role.valueOf(role), newDate2, newDate1 , branch, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5, contact, email, guardianContact, guardianName);

        employeeService.updateEmployee(employeeDTO);
    }

    @DeleteMapping(value = "/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable String id) {

        employeeService.deleteEmployeee(id);
    }

    @GetMapping("/genarateNextId")
    @ResponseStatus(HttpStatus.OK)
    public String generateNextEmpId() {

        String s = employeeService.generateNextId();
        if (s != null) {
            return s;

        }
        return null;
    }

    @GetMapping(value = "/searchByName/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> searchByName(@PathVariable String name) {

        try {
            List<EmployeeDTO> employeeDTOS = employeeService.searchByName(name);
            if (employeeDTOS == null) {
                responseDTO.setCode(HttpStatus.BAD_GATEWAY);
                responseDTO.setMessage("No Data");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);

            }
            responseDTO.setCode(HttpStatus.OK);
            responseDTO.setMessage("Success");
            responseDTO.setData(employeeDTOS);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            responseDTO.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(e);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


