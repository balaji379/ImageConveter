package com.vb.image.converter.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.vb.image.converter.repository.userRepo;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomeUserDetailService implements UserDetailsService {

    private userRepo userRepo;

    public CustomeUserDetailService(com.vb.image.converter.repository.userRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.vb.image.converter.entity.User user = userRepo.findByusername(username).orElseGet(null);
        String[] roles = null;
        if (user != null) {
            roles = user.getRoles().stream().toArray(String[]::new);
            return User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRoles().stream().collect(Collectors.joining(",")))
                    .build();
        }
        else return null;
    }
}
