package lk.ijse.gdse66.shoeshopbackend.service.impl;


import lk.ijse.gdse66.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.shoeshopbackend.dto.UserDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.User;
import lk.ijse.gdse66.shoeshopbackend.repository.UserRepository;
import lk.ijse.gdse66.shoeshopbackend.service.AuthenticationService;
import lk.ijse.gdse66.shoeshopbackend.service.JwtService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.InvalidCredentialsException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.InvalidPasswordException;
import lk.ijse.gdse66.shoeshopbackend.util.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
//            User user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("user not found"));
//            System.out.println(user.getUsername());
//            String generateToken = jwtService.generateToken(user);
//            return JwtAuthResponse.builder().token(generateToken).build();
//        }catch (AuthenticationException exception){
//            throw new InvalidCredentialsException("Invalid email or password");
//
//        }
        User user = userRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found!! Please Enter Valid Email"));

        try {
            // Perform authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );

            // Generate JWT token
            String generateToken = jwtService.generateToken(user);

            // Return JWT token
            return JwtAuthResponse.builder().token(generateToken).build();

        } catch (BadCredentialsException ex) {
            // Handle incorrect password
            throw new InvalidPasswordException("Invalid password");
        } catch (AuthenticationException ex) {
            // Handle other authentication failures
            throw new InvalidCredentialsException("Invalid email or password");
        }

    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
        UserDTO userDTO = UserDTO.builder()

                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.valueOf(signUpRequest.getRole()))
                .build();
        User savedUser = userRepository.save(modelMapper.map(userDTO, User.class));
        String generateToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generateToken).build();


    }
}
