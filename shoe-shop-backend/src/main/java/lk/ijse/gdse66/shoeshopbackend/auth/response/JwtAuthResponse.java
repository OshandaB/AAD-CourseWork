package lk.ijse.gdse66.shoeshopbackend.auth.response;

import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthResponse {
    private String token;
    private UserDTO userDTO;
      private EmployeeDTO employeeDTO;

}
