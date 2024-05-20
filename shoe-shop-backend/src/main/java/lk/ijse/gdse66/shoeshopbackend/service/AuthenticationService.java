package lk.ijse.gdse66.shoeshopbackend.service;


import lk.ijse.gdse66.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);


}
