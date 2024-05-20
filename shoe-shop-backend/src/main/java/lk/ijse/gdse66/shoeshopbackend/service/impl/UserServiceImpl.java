package lk.ijse.gdse66.shoeshopbackend.service.impl;


import lk.ijse.gdse66.shoeshopbackend.dto.UserDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.User;
import lk.ijse.gdse66.shoeshopbackend.repository.UserRepository;
import lk.ijse.gdse66.shoeshopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private  final UserRepository userRepository;
     private final ModelMapper modelMapper;
    @Override
    public UserDetailsService userDetailService() {
        return username -> {
            return userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("USER Not Found!!"));
        };
        //another way
/*        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//                Optional<User> email = userRepository.findByEmail(username);
//                return email.orElseThrow(() -> new UsernameNotFoundException("user not found"));
                return userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("USER Not Found!!"));


            }
        };*/
    }

    @Override
    public void save(UserDTO userDTO) {
       userRepository.save(modelMapper.map(userDTO, User.class));
    }
}
