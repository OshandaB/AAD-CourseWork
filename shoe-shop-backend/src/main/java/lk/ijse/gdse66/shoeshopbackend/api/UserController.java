package lk.ijse.gdse66.shoeshopbackend.api;



import lk.ijse.gdse66.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse66.shoeshopbackend.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.shoeshopbackend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final AuthenticationService authenticationService;
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }
}
