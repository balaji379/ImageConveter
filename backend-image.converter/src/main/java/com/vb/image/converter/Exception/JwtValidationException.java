package com.vb.image.converter.Exception;

import io.jsonwebtoken.Jwt;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


public class JwtValidationException extends RuntimeException{
     public JwtValidationException(String msg){
         super(msg);
     }
}
