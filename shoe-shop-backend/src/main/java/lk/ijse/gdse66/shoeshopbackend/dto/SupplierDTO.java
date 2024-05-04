package lk.ijse.gdse66.shoeshopbackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.shoeshopbackend.util.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDTO implements Serializable {

    @Pattern(regexp = "^SUP-\\d{3}$", message = "ID must be in the format SUP-001")
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Category is required")
    private Category category;
    private String addressLine01;
    private String addressLine02;

    private String addressLine03;


    private String addressLine04;

    private String addressLine05;


    private String addressLine06;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message="Contact number must be 10 digits")
    private String contactNo1;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp="(^$|[0-9]{10})", message="Contact number must be 10 digits")
    private String contactNo2;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
}
