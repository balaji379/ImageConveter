package com.vb.image.converter.service;

import org.springframework.context.annotation.Scope;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class OauthAuthenticationPrincipleService {
    public DefaultOAuth2User getPrincipal() {
        return principal;
    }

    public void setPrincipal(DefaultOAuth2User principal) {
        this.principal = principal;
    }

    private DefaultOAuth2User principal;

}
