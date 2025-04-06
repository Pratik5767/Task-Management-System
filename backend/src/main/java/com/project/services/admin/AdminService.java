package com.project.services.admin;

import com.project.dto.UserDto;

import java.util.List;

public interface AdminService {

    List<UserDto> getUsers();

}