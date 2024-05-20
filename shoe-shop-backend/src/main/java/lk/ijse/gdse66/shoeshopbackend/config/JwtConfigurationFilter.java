package lk.ijse.gdse66.shoeshopbackend.config;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lk.ijse.gdse66.shoeshopbackend.service.JwtService;
import lk.ijse.gdse66.shoeshopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class JwtConfigurationFilter extends OncePerRequestFilter {
  private  final JwtService jwtService;
  private final UserService userService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")){
            String jwt = authorization.substring(7);
            String extractUserName = jwtService.extractUserName(jwt);
            if (extractUserName != null && SecurityContextHolder.getContext().getAuthentication() ==null){
                UserDetails userDetails = userService.userDetailService().loadUserByUsername(extractUserName);

                if (jwtService.isTokenValid(jwt,userDetails)){
                  UsernamePasswordAuthenticationToken authToken =  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                  authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                  SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            }


        }
        filterChain.doFilter(request,response);
    }
}
