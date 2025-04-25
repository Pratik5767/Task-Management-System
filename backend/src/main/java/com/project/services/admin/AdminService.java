package com.project.services.admin;

import com.project.dto.TaskDto;
import com.project.dto.UserDto;

import java.util.List;

public interface AdminService {

    List<UserDto> getUsers();

    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTask();

    void deleteTask(Long id);
}