package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.UserLoginRequest;
import com.fwrt.dashboard.dto.UserLoginResponse;
import com.fwrt.dashboard.dto.UserRegistrationDto;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Inventory;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.fwrt.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InventoryService inventoryService;

    @Autowired
    EmailService emailService;

   public String createAccount(UserRegistrationDto request){
       PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
       String encodedPassword = passwordEncoder.encode(request.getPassword());

       User user = new User();
       user.setId(generateId());
       user.setUserName(request.getUserName());
       user.setEmail(request.getEmail());
       user.setPassword(encodedPassword);
       user.setCreatedDate(new Date());
       user.setInventory(inventoryService.createinventory(user));
       user.setUserRole("user");
       userRepository.save(user);
       return "success";
   }


   public Optional<User> retriveUserById(Long id){
       return userRepository.findById(id);
   }

    public UserLoginResponse retrieveUserByUserNameAndPassword(UserLoginRequest request) {
        Optional<User> user = userRepository.findByUserName(request.getUserName());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            UserLoginResponse userLoginResponse = new UserLoginResponse();
            userLoginResponse.setUserId(user.get().getId());
            userLoginResponse.setUserName(user.get().getUserName());
            userLoginResponse.setInventoryId(user.get().getInventory().getId());
            userLoginResponse.setUserRole(user.get().getUserRole());

            return userLoginResponse;
        } else {
            // Handle login failure
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Incorrect login credentials");
        }
    }


    public String updateFoodItemsAndNotifications(Long userId, List<Notifications> notifications) {
        Optional<User> user = retriveUserById(userId);
        user.get().getNotifications().addAll(notifications);
        userRepository.save(user.get());
        return "saved sucessfully";
    }

    public String forgetPassword(String receiptEmailId){
       Optional<User> user = userRepository.findUserByEmail(receiptEmailId);

       //update user password and send email
        if(user.isPresent()){
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            //dummy password
            String newPassword = "xy0u67&8@";

            String encodedPassword = passwordEncoder.encode(newPassword);
            user.get().setPassword(encodedPassword);
            userRepository.save(user.get());

            //send email to user
            emailService.sendEmail(receiptEmailId, user.get().getUserName(), newPassword);
            return "password reset successfully";
        }
        return "no user found";
    }



    public String saveInventory(Inventory request){
    inventoryService.saveInventory(request);
    return "saved sucessfully";
    }

    private long generateId(){
        return  userRepository.getAllUsersCount() +1;

    }


}
