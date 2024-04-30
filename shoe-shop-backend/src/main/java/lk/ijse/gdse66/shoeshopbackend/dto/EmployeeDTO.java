package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lk.ijse.gdse66.shoeshopbackend.util.CivilStatus;
import lk.ijse.gdse66.shoeshopbackend.util.Gender;
import lk.ijse.gdse66.shoeshopbackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDTO implements Serializable {
    @Pattern(regexp = "^EMP-\\d{3}$", message = "ID must be in the format EMP-001")
    private String id;

    @NotBlank(message = "Name is required")
    private String name;


    private String employeeProfilePic;

    @NotNull(message = "Gender is required")
    private Gender gender;

    private CivilStatus civilStatus;

    private String designation;

    @NotNull(message = "Access role is required")
    private Role accessRole;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private Date dob;

    @NotNull(message = "Join date is required")
    @Past(message = "Join date must be in the past")
    private Date dateOfJoin;

    private String attachedBranch;

    private String addressLine01;

    private String addressLine02;

    @NotBlank(message = "city is required")
    private String addressLine03;
    @NotBlank(message = "state is required")
    private String addressLine04;
    @NotBlank(message = "postalCode is required")
    private String addressLine05;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message="Contact number must be 10 digits")
    private String contactNo;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Emergency Contact number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message="Contact number must be 10 digits")
    private String emergencyContact;

    @NotBlank(message = "Emergency contact person is required if emergency contact is provided")
    private String emergencyContactPerson;
}
