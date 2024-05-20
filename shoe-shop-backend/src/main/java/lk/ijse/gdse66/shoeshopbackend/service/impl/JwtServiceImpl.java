package lk.ijse.gdse66.shoeshopbackend.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import lk.ijse.gdse66.shoeshopbackend.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${token.key}")
    String jwtKey;
    @Override
    public String extractUserName(String token) {
        return extractClaims(token,claims -> claims.getSubject());
    }

    @Override
    public String generateToken(UserDetails userDetails) {
         HashMap<String,Object> claims = new HashMap<>();
         claims.put("role",userDetails.getAuthorities());
        Date currntDate = new Date();
        Date expiredDate = new Date(currntDate.getTime() + 1000 * 600);
        String accessToken = Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).setIssuedAt(currntDate).setExpiration(expiredDate).signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
        return accessToken;
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String subject = extractClaims(token, claims -> claims.getSubject());
        return subject.equals(userDetails.getUsername()) && !isExpired(token);
    }

    private Key getSignKey(){
        byte[] decode = Decoders.BASE64.decode(jwtKey);
        SecretKey secretKey = Keys.hmacShaKeyFor(decode);
        return secretKey;
    }
    private Claims getAllClaims(String token){
    return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    private <T> T extractClaims(String token, Function<Claims,T> claimsTFunction){

        Claims allClaims = getAllClaims(token);
        return claimsTFunction.apply(allClaims);

    }
    private boolean isExpired(String token){
        Date expireData = extractClaims(token, claims -> claims.getExpiration());
       return expireData.before(new Date());
    }
}
