package com.vb.image.converter.controller;

import com.vb.image.converter.Exception.JwtValidationException;
import com.vb.image.converter.entity.User;
import com.vb.image.converter.security.JwtUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vb.image.converter.repository.userRepo;

import java.util.Set;

@RestController
@RequestMapping("/images-validate")
public class JwtController {

    private JwtUtility jwtUtility;
    private userRepo userRepo;

    @Autowired
    public JwtController(JwtUtility jwtUtility, userRepo userRepo) {
        this.jwtUtility = jwtUtility;
        this.userRepo = userRepo;
    }

    @PostMapping("/generateToken")
    public ResponseEntity<String> generateToken(@RequestBody User unvalidUser) {
        System.out.println("this info obj get from react : " + unvalidUser.toString());
        if (userRepo.existsByusername(unvalidUser.getUsername()))
             return ResponseEntity.ok(jwtUtility.generateToken(unvalidUser.getUsername()));
        else {
            return ResponseEntity.badRequest().body("invalid credentials");
        }
    }

    @GetMapping("/validateToken")
    public String validateToken(HttpServletRequest reqeust) {
//        System.out.println();
        String token = reqeust.getHeader("Authorization");
        System.out.println("this is token print from validate token" + token);
        if (token != null && token.length() > 7) {
            token = token.substring(7);
            if (jwtUtility.isValid(token)) {
                return "token is valid";
            } else {
                return "invalid user";
            }
        }else throw new JwtValidationException("missing header field");

    }
}
