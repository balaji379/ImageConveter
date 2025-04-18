package com.vb.image.converter.security;

import com.vb.image.converter.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import com.vb.image.converter.repository.userRepo;

import javax.security.sasl.AuthenticationException;
import java.io.IOException;

@Service
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtility jwtUtility;
    private userRepo userRepo;
    @Autowired
    private CustomeUserDetailService customeUserDetailService;

    public JwtFilter(JwtUtility jwtUtility, com.vb.image.converter.repository.userRepo userRepo, CustomeUserDetailService customeUserDetailService) {
        this.jwtUtility = jwtUtility;
        this.userRepo = userRepo;
        this.customeUserDetailService = customeUserDetailService;
    }

    public JwtFilter() {
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        System.err.println(token);
        try {
            if (token != null && token.length() > 7 && token.startsWith("Bearer ")) {
                System.out.println("this is enter the jwt filter");
                token = token.substring(7);
                System.err.println("this msg is print from jwtfilter class");
                String username = jwtUtility.extractUsername(token);
                System.err.println("this is print in jwtfilter the username " + username);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = customeUserDetailService.loadUserByUsername(username);

                    if (userDetails != null) {
                        if (jwtUtility.isValid(token)) {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        } else {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("user invalid");
                            return;
                        }
                    } else {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("user invalid");
                        System.err.println("this is print in filter");
                        return;
                    }
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("user invalid");
                    return;
                }
            } else {
                if (SecurityContextHolder.getContext().getAuthentication() != null) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Header field is missing");
                    return;
                }
            }
        } catch (Exception e) {
            System.err.println("this error message that print in jwtFilter: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("user invalid");
            return;
        }

        filterChain.doFilter(request, response);
    }
}