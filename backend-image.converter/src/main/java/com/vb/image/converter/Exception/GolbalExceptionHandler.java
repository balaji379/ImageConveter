package com.vb.image.converter.Exception;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ControllerAdvice
public class GolbalExceptionHandler {

    @ExceptionHandler(JwtValidationException.class)
    public ResponseEntity<?> handleJwtException(JwtValidationException e){
        System.err.println("this is exception msg is print from ControlAdvice ");
        return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(403));
    }
}
