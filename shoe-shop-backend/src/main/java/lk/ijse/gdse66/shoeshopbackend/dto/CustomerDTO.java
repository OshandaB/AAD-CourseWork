package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.*;

import jakarta.validation.constraints.*;
import lk.ijse.gdse66.shoeshopbackend.util.Gender;
import lk.ijse.gdse66.shoeshopbackend.util.Level;
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
public class CustomerDTO  {
    @Pattern(regexp = "^CUS-\\d{3}$", message = "ID must be in the format CUS-001")
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Join date is required")
    @Past(message = "Join date must be in the past")
    private Date joinDate;

    @NotNull(message = "Level is required")
    private Level level;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private Date dob;

    private String addressLine01;

    private String addressLine02;


    private String addressLine03;


    private String addressLine04;


    private String addressLine05;


    // Add validations for other address lines as needed

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message="Contact number must be 10 digits")
    private String contactNo;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Total points is required")
    @Min(value = 0, message = "Total points must be at least 0")
    private Integer totalPoints;

    private Date recentPurchaseDate;

}
