package com.vb.image.converter.security;

import com.vb.image.converter.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.vb.image.converter.repository.userRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class JwtUtility {
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final int expirationTime = 84600000;
    @Autowired
    private userRepo userRepo;

    public String generateToken(String username) {
        System.out.println("this is username print from generatetoken method : " + username);
        User user = userRepo.findByusername(username).orElse(null);
        if(user == null)
            return "invalid user";
        Set<String> roles = user.getRoles();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("roles", roles.stream().map(role -> role).collect(Collectors.joining(",")))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expirationTime))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        Claims claims =  Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        System.out.println("the claims print from extractusername is : " + claims);
        System.out.println("user name extract from claims is : " + claims.getSubject());
        return  claims.getSubject();
    }

    public Set<String> extractRoles(String token) {
        String roles = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roles", String.class);
        return Set.of(roles);
    }
    public boolean isValid(String token){
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (RuntimeException e) {
            System.out.println("this is throw the error");
//            System.out.println(e);
            return false;
        }
    }
}
