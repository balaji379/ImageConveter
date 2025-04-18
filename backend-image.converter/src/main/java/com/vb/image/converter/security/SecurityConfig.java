package com.vb.image.converter.security;

import com.vb.image.converter.service.OauthAuthenticationPrincipleService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.vb.image.converter.repository.userRepo;

import java.security.Security;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Autowired
    OauthAuthenticationPrincipleService principleService;
    @Autowired
    userRepo userRepo;
    /*
    *   public SecurityFilterChain setUpSecurity(HttpSecurity http) throws Exception {
            return http
                    .authorizeHttpRequests(request -> {
                        request.requestMatchers("/").permitAll();
                        request.anyRequest().authenticated();
                    })
                    .oauth2Login(oauth -> {
                        oauth
                                .loginPage("http://localhost:5173/image-converte")
                                .successHandler(
                                        ((request, response, authentication) -> response.sendRedirect("http://localhost:5173/conversion-result")));
                    })
                    .csrf(c ->c.disable())
                    .build();
        }
    * */
    JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain setupHttpSecurity(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(request -> request
                        .requestMatchers("/image/dummy").hasRole("admin")
                        .requestMatchers("/image/login", "/image/validate/user", "/images-validate/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .oauth2Login(login -> {
                    login
                            .loginPage("http://localhost:5173/login")
                            .successHandler((request, response, authentication) -> {
                                System.out.println(authentication.getPrincipal());
                                principleService.setPrincipal((DefaultOAuth2User) authentication.getPrincipal());
                                response.sendRedirect("http://localhost:5173/login");
                            });
                })
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .formLogin(loginform -> loginform.disable())
                .httpBasic(basic -> basic.disable())
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        ;
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
        return urlBasedCorsConfigurationSource;
    }
}
