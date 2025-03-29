package com.project.services.auth;

import com.project.dto.SignUpRequest;
import com.project.dto.UserDto;

public interface AuthService {

    UserDto signUpUser(SignUpRequest signUpRequest);

    boolean hasUserWithEmail(String email);

}