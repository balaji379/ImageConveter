package com.vb.image.converter.security;

import org.springframework.beans.factory.parsing.Problem;
import org.springframework.beans.factory.parsing.ProblemReporter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice
//public class CustomizeException {
//    @ExceptionHandler(Exception.class)
//    public ProblemDetail handleSecurityException(Exception ex){
//        if (ex instanceof BadCredentialsException){
//            ProblemDetail errormsg = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
//            errormsg.setProperty("access denied ","Authentication failure");
//        }
//    }
//}
