package lk.ijse.gdse66.shoeshopbackend.service;


import lk.ijse.gdse66.shoeshopbackend.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    void save(UserDTO userDTO);
}
