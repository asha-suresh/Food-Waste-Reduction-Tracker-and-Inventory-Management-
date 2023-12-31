package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.UserLoginRequest;
import com.fwrt.dashboard.dto.UserLoginResponse;
import com.fwrt.dashboard.dto.UserRegistrationDto;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value ="/api/create/account")
    public String registerUser(@RequestBody UserRegistrationDto request){
        return userService.createAccount(request);
    }

    @PostMapping(value ="/api/user/login")
    public UserLoginResponse loginUser(@RequestBody UserLoginRequest request){
        return userService.retrieveUserByUserNameAndPassword(request);
    }

    @GetMapping(value ="/api/view/user/details")
    public Optional<User> viewUserDetails(@RequestParam (required = true) Long userId) {
        return userService.retriveUserById(userId);
    }

    @GetMapping("/api/forget/password")
    public String sendEmail(@RequestParam String emailId) {
        return userService.forgetPassword(emailId);
    }
}
